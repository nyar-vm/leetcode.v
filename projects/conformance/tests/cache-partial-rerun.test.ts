import { readFileSync } from 'node:fs';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

import { PROBLEMS } from '../src/catalog/index.ts';
import type { MeasurementOutcome, MeasurementPlan } from '../src/domain/measurement.ts';
import type { RunRecord } from '../src/reporting/cache/types.ts';
import { problemSourceDigest } from '../src/reporting/cache/run-id.ts';
import { toProblemSpec } from '../src/planning/problem-selection.ts';

const ADAPTER_VERSION = '0.2.0';

function minimalPlan(): MeasurementPlan {
    return {
        boundary: 'metadata-tests',
        difficulty: 'Easy',
        inputScale: 'small',
        timeoutMs: 30_000,
        timeBudgetMs: 60_000,
        warmupRuns: 1,
        minValidSamples: 2,
        maxAttempts: 5,
        maxRelativeSpread: 0.2,
        interleaveRuntimes: false,
    };
}

function measurementWithSamples(sampleMs: number[]): MeasurementOutcome {
    const plan = minimalPlan();
    const rawSamples = sampleMs.map((durationMs, index) => ({
        attempt: index + 1,
        boundary: plan.boundary,
        durationMs,
        discarded: false,
    }));
    const attempts = rawSamples.map((sample) => ({
        attempt: sample.attempt,
        status: 'ok' as const,
        durationMs: sample.durationMs,
        samples: [sample],
        diagnostics: [],
        timestamp: new Date().toISOString(),
    }));
    const sorted = [...sampleMs].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return {
        plan,
        attempts,
        aggregation: 'median',
        publishedValueMs: median,
        stability: 'stable',
        rawSamples,
    };
}

function benchmarkRecord(input: { problemId: string; runId: string; sourceDigest: string; sampleMs: number[] }): RunRecord {
    const measurement = measurementWithSamples(input.sampleMs);
    const finishedAt = new Date().toISOString();
    return {
        manifest: {
            runId: input.runId,
            problemId: input.problemId,
            implementationId: 'python',
            mode: 'benchmark',
            createdAt: finishedAt,
            sourceDigest: input.sourceDigest,
            adapterVersion: ADAPTER_VERSION,
            toolchain: { implementationId: 'python' },
        },
        result: {
            runId: input.runId,
            problemId: input.problemId,
            implementationId: 'python',
            mode: 'benchmark',
            status: 'passed',
            cases: [],
            diagnostics: [],
            toolchain: { implementationId: 'python', adapterVersion: ADAPTER_VERSION },
            startedAt: finishedAt,
            finishedAt,
        },
        measurement,
    };
}

describe('cache partial rerun e2e', () => {
    let tempRoot: string;
    let cacheRoot: string;
    let publicDir: string;

    beforeEach(() => {
        tempRoot = mkdtempSync(join(tmpdir(), 'conformance-e2e-'));
        cacheRoot = join(tempRoot, 'conformance');
        publicDir = join(tempRoot, 'dashboard', 'public');
        vi.resetModules();
        vi.doMock('../src/domain/paths.ts', () => ({
            CONFORMANCE_CACHE_ROOT: cacheRoot,
            LEETCODE_ROOT: REPO_ROOT,
            CONFORMANCE_ROOT: join(REPO_ROOT, 'projects', 'conformance'),
            BENCH_PUBLIC_DIR: publicDir,
        }));
    });

    afterEach(() => {
        rmSync(tempRoot, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    it('keeps both consecutive run directories with distinct raw samples', async () => {
        const { writeRunRecord, readRunRecord, readIndex } = await import('../src/reporting/cache/store.ts');

        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'run-first',
                sourceDigest: 'digest-v1',
                sampleMs: [1.1, 1.2, 1.15],
            }),
        );
        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'run-second',
                sourceDigest: 'digest-v1',
                sampleMs: [2.4, 2.5, 2.45],
            }),
        );

        const first = readRunRecord('run-first');
        const second = readRunRecord('run-second');
        expect(first?.measurement?.rawSamples).toHaveLength(3);
        expect(second?.measurement?.rawSamples).toHaveLength(3);
        expect(first?.measurement?.publishedValueMs).not.toBe(second?.measurement?.publishedValueMs);

        const attemptsText = readFileSync(join(cacheRoot, 'runs', 'run-second', 'attempts.jsonl'), 'utf8');
        expect(attemptsText.trim().split('\n')).toHaveLength(3);

        const index = readIndex();
        expect(index.entries['two-sum:python:benchmark'].runId).toBe('run-second');
        expect(readRunRecord('run-first')).not.toBeNull();
    });

    it('merges partial rerun into current index without dropping other problems', async () => {
        const { writeRunRecord, listCurrentRunRecords } = await import('../src/reporting/cache/store.ts');
        const { projectLanguageReport } = await import('../src/reporting/dashboard-projection.ts');

        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'two-sum-a',
                sourceDigest: 'digest-a',
                sampleMs: [1.0, 1.1],
            }),
        );
        writeRunRecord(
            benchmarkRecord({
                problemId: 'add-two-numbers',
                runId: 'add-two-a',
                sourceDigest: 'digest-add',
                sampleMs: [3.0, 3.1],
            }),
        );
        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'two-sum-b',
                sourceDigest: 'digest-b',
                sampleMs: [1.5, 1.6],
            }),
        );

        const current = listCurrentRunRecords();
        expect(current).toHaveLength(2);
        const byProblem = new Map(current.map((record) => [record.manifest.problemId, record]));
        expect(byProblem.get('two-sum')?.manifest.runId).toBe('two-sum-b');
        expect(byProblem.get('add-two-numbers')?.manifest.runId).toBe('add-two-a');

        const report = projectLanguageReport('python', current);
        const rows = new Map(report.rows.map((row) => [row.id, row]));
        expect(rows.get('two-sum')?.runId).toBe('two-sum-b');
        expect(rows.get('add-two-numbers')?.runId).toBe('add-two-a');
        expect(rows.get('two-sum')?.runtimeMs).toBe(1.6);
    });

    it('marks stale cache rows as not sourceCurrent in dashboard projection', async () => {
        const { writeRunRecord, listCurrentRunRecords } = await import('../src/reporting/cache/store.ts');
        const { projectLanguageReport } = await import('../src/reporting/dashboard-projection.ts');

        const problem = PROBLEMS.find((item) => item.id === 'two-sum');
        expect(problem).toBeDefined();
        const spec = toProblemSpec(problem!);
        const liveDigest = problemSourceDigest('two-sum', 'python', spec.tests);

        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'stale-run',
                sourceDigest: 'outdated-digest',
                sampleMs: [1.0, 1.0],
            }),
        );
        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'fresh-run',
                sourceDigest: liveDigest,
                sampleMs: [2.0, 2.0],
            }),
        );

        const report = projectLanguageReport('python', listCurrentRunRecords());
        const row = report.rows.find((item) => item.id === 'two-sum');
        expect(row?.runId).toBe('fresh-run');
        expect(row?.sourceCurrent).toBe(true);
        expect(row?.sourceDigest).toBe(liveDigest);
    });

    it('writes dashboard json that reflects merged current cache after partial rerun', async () => {
        const { writeRunRecord } = await import('../src/reporting/cache/store.ts');
        const { writeDashboardProjection } = await import('../src/reporting/dashboard-projection.ts');

        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'dash-two-a',
                sourceDigest: 'd1',
                sampleMs: [1.0, 1.0],
            }),
        );
        writeRunRecord(
            benchmarkRecord({
                problemId: 'add-two-numbers',
                runId: 'dash-add-a',
                sourceDigest: 'd2',
                sampleMs: [4.0, 4.0],
            }),
        );

        writeRunRecord(
            benchmarkRecord({
                problemId: 'two-sum',
                runId: 'dash-two-b',
                sourceDigest: 'd3',
                sampleMs: [1.2, 1.2],
            }),
        );

        const outPath = writeDashboardProjection('python');
        const report = JSON.parse(readFileSync(outPath, 'utf8')) as {
            rows: Array<{ id: string; runId: string }>;
        };
        const ids = new Set(report.rows.map((row) => row.id));
        expect(ids.has('two-sum')).toBe(true);
        expect(ids.has('add-two-numbers')).toBe(true);
        expect(report.rows.find((row) => row.id === 'two-sum')?.runId).toBe('dash-two-b');
        expect(report.rows.find((row) => row.id === 'add-two-numbers')?.runId).toBe('dash-add-a');
    });
});
