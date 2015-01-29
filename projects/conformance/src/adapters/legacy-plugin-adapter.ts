import type { SolverAdapter, AdapterEnvironment } from "../domain/adapter.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import type { RunResult, CaseResult } from "../domain/result.ts";
import type { MeasurementOutcome, MeasurementPlan } from "../domain/measurement.ts";
import type { ImplementationId } from "./ids.ts";
import type { LanguageBenchPlugin } from "./plugin-types.ts";
import { runAdaptiveMeasurement } from "../execution/measurement-runner.ts";
import { metaForProblem, toProblemSpec } from "../planning/problem-selection.ts";
import { PROBLEMS } from "../catalog/index.ts";

const ADAPTER_VERSION = "0.2.0";

function problemDefinition(problem: ProblemSpec): (typeof PROBLEMS)[number] {
    const found = PROBLEMS.find((item) => item.id === problem.id);
    if (!found) {
        throw new Error(`unknown problem ${problem.id}`);
    }
    return found;
}

/** 将历史 LanguageBenchPlugin 包装为 SolverAdapter；迁移完成后各语言目录内联实现。 */
export function wrapBenchPlugin(
    implementationId: ImplementationId,
    plugin: LanguageBenchPlugin,
    runCorrectness?: (problem: ProblemSpec, problemRoot: string) => Promise<RunResult>,
): SolverAdapter {
    return {
        implementationId,

        discover(problemRoot: string): boolean {
            return plugin.hasSolver(problemRoot);
        },

        async prepare(): Promise<{ ok: boolean; error?: string }> {
            if (!plugin.runnerReady()) {
                return { ok: false, error: "runner not ready" };
            }
            return { ok: true };
        },

        async invokeCorrectness(problem: ProblemSpec, problemRoot: string): Promise<RunResult> {
            const startedAt = new Date().toISOString();
            if (runCorrectness) {
                return runCorrectness(problem, problemRoot);
            }
            const def = problemDefinition(problem);
            try {
                const outcome = await plugin.benchProblem(def);
                const passed = !outcome.error;
                const finishedAt = new Date().toISOString();
                return {
                    runId: "",
                    problemId: problem.id,
                    implementationId,
                    mode: "correctness",
                    status: passed ? "passed" : "failed",
                    cases: problem.tests.map(
                        (test, index): CaseResult => ({
                            index,
                            status: passed ? "passed" : "failed",
                            expected: test.expected,
                        }),
                    ),
                    diagnostics: outcome.error ? [outcome.error] : [],
                    toolchain: {
                        implementationId,
                        adapterVersion: ADAPTER_VERSION,
                    },
                    startedAt,
                    finishedAt,
                };
            } catch (err) {
                const finishedAt = new Date().toISOString();
                return {
                    runId: "",
                    problemId: problem.id,
                    implementationId,
                    mode: "correctness",
                    status: "failed",
                    cases: [],
                    diagnostics: [String(err)],
                    toolchain: {
                        implementationId,
                        adapterVersion: ADAPTER_VERSION,
                    },
                    startedAt,
                    finishedAt,
                };
            }
        },

        async invokeBenchmark(
            problem: ProblemSpec,
            _problemRoot: string,
            plan: MeasurementPlan,
        ): Promise<{ result: RunResult; measurement: MeasurementOutcome }> {
            const def = problemDefinition(problem);
            const startedAt = new Date().toISOString();
            const measurement = await runAdaptiveMeasurement(plan, async () => {
                const outcome = await plugin.benchProblem(def);
                if (outcome.error) {
                    throw new Error(outcome.error);
                }
                const ms = outcome.runtimeMs ?? outcome.compileMs;
                if (typeof ms !== "number" || !Number.isFinite(ms) || ms <= 0) {
                    throw new Error("invalid benchmark sample");
                }
                return ms;
            });

            const finishedAt = new Date().toISOString();
            const status =
                measurement.stability === "stable" && measurement.publishedValueMs !== null
                    ? "passed"
                    : measurement.stability === "unstable"
                      ? "failed"
                      : "failed";

            const result: RunResult = {
                runId: "",
                problemId: problem.id,
                implementationId,
                mode: "benchmark",
                status,
                cases: [],
                diagnostics:
                    measurement.stability !== "stable"
                        ? [`measurement ${measurement.stability}`]
                        : [],
                toolchain: {
                    implementationId,
                    adapterVersion: ADAPTER_VERSION,
                },
                startedAt,
                finishedAt,
            };

            return { result, measurement };
        },

        describeEnvironment(): AdapterEnvironment {
            const env = plugin.collectEnvironment();
            const ready = plugin.runnerReady();
            return {
                implementationId,
                ready,
                blockedReason: ready ? null : "runner not ready",
                details: env as unknown as Record<string, unknown>,
            };
        },
    };
}

export function benchRowFromRecord(
    problem: ProblemSpec,
    record: { result: RunResult; measurement?: MeasurementOutcome },
): Record<string, unknown> {
    const meta = metaForProblem(problemDefinition(problem));
    const row: Record<string, unknown> = {
        id: problem.id,
        ...meta,
        error: record.result.blockedReason ?? (record.result.diagnostics.join("; ") || null),
        runId: record.result.runId,
        sourceCurrent: true,
    };
    if (record.measurement?.publishedValueMs !== undefined) {
        row.runtimeMs = record.measurement.publishedValueMs;
        row.stability = record.measurement.stability;
    }
    return row;
}

export { toProblemSpec };
