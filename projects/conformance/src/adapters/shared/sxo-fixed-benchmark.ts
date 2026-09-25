import type { ProblemDefinition } from '../../catalog/index.ts';
import type { ProblemSpec } from '../../domain/problem.ts';
import type { RunResult } from '../../domain/result.ts';
import type { MeasurementOutcome, MeasurementPlan } from '../../domain/measurement.ts';
import type { ImplementationId } from '../ids.ts';

const ADAPTER_VERSION = '0.2.0';

/** SXO 与 Python 对齐：题内 `SXO_BENCH_PARAMS` 已含 warmup/iterations，不再套 adaptive 外层采样。 */
export async function invokeSxoFixedBenchmark(
    implementationId: ImplementationId,
    problem: ProblemSpec,
    benchProblem: (problem: ProblemDefinition) => Promise<number>,
    plan: MeasurementPlan,
): Promise<{ result: RunResult; measurement: MeasurementOutcome }> {
    const startedAt = new Date().toISOString();
    const problemDef: ProblemDefinition = { id: problem.id, title: problem.title };
    let runtimeMs: number;
    try {
        runtimeMs = await benchProblem(problemDef);
    } catch (err) {
        const finishedAt = new Date().toISOString();
        return {
            result: {
                runId: '',
                problemId: problem.id,
                implementationId,
                mode: 'benchmark',
                status: 'failed',
                cases: [],
                diagnostics: [String(err)],
                toolchain: { implementationId, adapterVersion: ADAPTER_VERSION },
                startedAt,
                finishedAt,
            },
            measurement: {
                plan,
                attempts: [],
                aggregation: 'median',
                publishedValueMs: null,
                stability: 'insufficient',
                rawSamples: [],
            },
        };
    }

    if (!Number.isFinite(runtimeMs) || runtimeMs <= 0) {
        throw new Error(`invalid sxo benchmark medianMs: ${String(runtimeMs)}`);
    }

    const finishedAt = new Date().toISOString();
    const sample = {
        attempt: 1,
        boundary: plan.boundary,
        durationMs: runtimeMs,
        discarded: false as const,
    };
    const measurement: MeasurementOutcome = {
        plan,
        attempts: [
            {
                attempt: 1,
                status: 'ok' as const,
                durationMs: runtimeMs,
                samples: [sample],
                diagnostics: [],
                timestamp: startedAt,
            },
        ],
        aggregation: 'median',
        publishedValueMs: runtimeMs,
        stability: 'stable',
        rawSamples: [sample],
    };

    return {
        result: {
            runId: '',
            problemId: problem.id,
            implementationId,
            mode: 'benchmark',
            status: 'passed',
            cases: [],
            diagnostics: [],
            toolchain: { implementationId, adapterVersion: ADAPTER_VERSION },
            startedAt,
            finishedAt,
        },
        measurement,
    };
}
