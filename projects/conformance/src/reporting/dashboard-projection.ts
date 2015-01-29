import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { BENCH_PUBLIC_DIR } from "../domain/paths.ts";
import { PROBLEMS } from "../catalog/index.ts";
import type { ImplementationId } from "../adapters/ids.ts";
import { DASHBOARD_BENCH_FILES, IMPLEMENTATION_TO_BENCH_LANGUAGE } from "../adapters/ids.ts";
import { listCurrentRunRecords } from "./cache/store.ts";
import type { RunRecord } from "./cache/types.ts";
import { metaForProblem, toProblemSpec } from "../planning/problem-selection.ts";

export type LanguageBenchReport = {
    language: string;
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment: Record<string, unknown>;
    rows: Record<string, unknown>[];
};

function recordsForImplementation(
    records: RunRecord[],
    implementationId: ImplementationId,
): RunRecord[] {
    return records.filter(
        (record) =>
            record.manifest.implementationId === implementationId &&
            record.manifest.mode === "benchmark",
    );
}

function buildRow(
    problem: ReturnType<typeof toProblemSpec>,
    record: RunRecord,
): Record<string, unknown> {
    const meta = metaForProblem({ id: problem.id, title: problem.title });
    const row: Record<string, unknown> = {
        id: problem.id,
        ...meta,
        runId: record.manifest.runId,
        sourceDigest: record.manifest.sourceDigest,
        sourceCurrent: true,
        error: record.result.blockedReason ?? (record.result.diagnostics.join("; ") || null),
    };
    const measurement = record.measurement;
    if (measurement) {
        row.runtimeMs = measurement.publishedValueMs;
        row.stability = measurement.stability;
        row.sampleCount = measurement.rawSamples.filter((s) => !s.discarded).length;
    }
    if (record.result.toolchain.artifacts) {
        for (const [key, value] of Object.entries(record.result.toolchain.artifacts)) {
            row[key] = value;
        }
    }
    return row;
}

export function projectLanguageReport(
    implementationId: ImplementationId,
    records: RunRecord[],
): LanguageBenchReport {
    const language = IMPLEMENTATION_TO_BENCH_LANGUAGE[implementationId];
    const relevant = recordsForImplementation(records, implementationId);
    const byProblem = new Map(relevant.map((record) => [record.manifest.problemId, record]));

    const rows: Record<string, unknown>[] = [];
    for (const problem of PROBLEMS) {
        const spec = toProblemSpec(problem);
        const record = byProblem.get(problem.id);
        if (record) {
            rows.push(buildRow(spec, record));
        }
    }

    const adapterEnv =
        relevant.length > 0 ? (relevant[0].manifest.toolchain as Record<string, unknown>) : {};

    return {
        language,
        generatedAt: new Date().toISOString(),
        ready: rows.some((row) => row.runtimeMs !== null && row.runtimeMs !== undefined),
        catalogTotal: PROBLEMS.length,
        environment: adapterEnv,
        rows,
    };
}

export function writeDashboardProjection(implementationId: ImplementationId): string {
    const records = listCurrentRunRecords();
    const report = projectLanguageReport(implementationId, records);
    const outPath = join(BENCH_PUBLIC_DIR, DASHBOARD_BENCH_FILES[implementationId]);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    return outPath;
}

export function writeAllDashboardProjections(implementationIds: ImplementationId[]): string[] {
    const records = listCurrentRunRecords();
    const paths: string[] = [];
    for (const id of implementationIds) {
        const report = projectLanguageReport(id, records);
        const outPath = join(BENCH_PUBLIC_DIR, DASHBOARD_BENCH_FILES[id]);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
        paths.push(outPath);
    }
    return paths;
}
