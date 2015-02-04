import type { ProblemDefinition } from "../catalog/index.ts";
import type { SolverAdapter, AdapterEnvironment } from "../domain/adapter.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import type { RunResult } from "../domain/result.ts";
import type { MeasurementOutcome, MeasurementPlan } from "../domain/measurement.ts";
import { runAdaptiveMeasurement } from "../execution/measurement-runner.ts";
import type { ImplementationId } from "./ids.ts";

const ADAPTER_VERSION = "0.2.0";

export type BenchProblemOutcome = {
    runtimeMs?: number | null;
    compileMs?: number | null;
    legionRoute?: string | null;
    benchTarget?: string;
    error?: string | null;
};

export type AdapterDefinition = {
    implementationId: ImplementationId;
    hasSolver: (problemRoot: string) => boolean;
    runnerReady: () => boolean;
    blockedReason?: () => string | null;
    collectEnvironment: () => Record<string, unknown>;
    benchProblem: (problem: ProblemDefinition) => Promise<BenchProblemOutcome>;
    runCorrectness: (problem: ProblemSpec, problemRoot: string) => Promise<RunResult>;
    prepare?: (problem: ProblemSpec, problemRoot: string) => Promise<{ ok: boolean; error?: string }>;
};

export function defineSolverAdapter(definition: AdapterDefinition): SolverAdapter {
    const {
        implementationId,
        hasSolver,
        runnerReady,
        blockedReason,
        collectEnvironment,
        benchProblem,
        runCorrectness,
        prepare,
    } = definition;

    return {
        implementationId,

        discover(problemRoot: string): boolean {
            return hasSolver(problemRoot);
        },

        async prepare(problem: ProblemSpec, problemRoot: string) {
            if (prepare) {
                return prepare(problem, problemRoot);
            }
            if (!runnerReady()) {
                return { ok: false, error: blockedReason?.() ?? "runner not ready" };
            }
            return { ok: true };
        },

        invokeCorrectness(problem: ProblemSpec, problemRoot: string) {
            return runCorrectness(problem, problemRoot);
        },

        async invokeBenchmark(problem: ProblemSpec, _problemRoot: string, plan: MeasurementPlan) {
            const startedAt = new Date().toISOString();
            const problemDef: ProblemDefinition = { id: problem.id, title: problem.title };
            const measurement = await runAdaptiveMeasurement(plan, async () => {
                const outcome = await benchProblem(problemDef);
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
                toolchain: { implementationId, adapterVersion: ADAPTER_VERSION },
                startedAt,
                finishedAt,
            };

            return { result, measurement };
        },

        describeEnvironment(): AdapterEnvironment {
            const ready = runnerReady();
            return {
                implementationId,
                ready,
                blockedReason: ready ? null : (blockedReason?.() ?? "runner not ready"),
                details: collectEnvironment(),
            };
        },
    };
}
