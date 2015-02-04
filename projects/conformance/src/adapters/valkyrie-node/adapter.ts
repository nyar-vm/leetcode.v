import { WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import { collectValkyrieBenchEnvironment } from "../../reporting/environment.ts";
import { defineSolverAdapter } from "../factory.ts";
import { runResultFromReference } from "../shared/correctness-result.ts";
import { benchValkyrieProblem } from "./bench.ts";
import { runVReference } from "./ref.ts";
import { hasValkyrieSolver, valkyrieRunnerReady, valkyrieSkipReason } from "./valkyrie.ts";

export const valkyrieNodeAdapter = defineSolverAdapter({
    implementationId: "valkyrie-node",
    hasSolver: hasValkyrieSolver,
    runnerReady: valkyrieRunnerReady,
    blockedReason: valkyrieSkipReason,
    collectEnvironment: collectValkyrieBenchEnvironment,
    async benchProblem(problem) {
        const result = benchValkyrieProblem(problem);
        return {
            compileMs: result.vCompileMs,
            runtimeMs: result.vRuntimeMs,
            legionRoute: result.legionRoute,
            benchTarget: WASM_NODE_BENCH_TARGET,
            error: result.error,
        };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasValkyrieSolver(problemRoot)) {
            return runResultFromReference(
                problem,
                "valkyrie-node",
                { ok: false, stderr: "solver not found" },
                startedAt,
                "solver not found",
            );
        }
        const ref = await runVReference({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, "valkyrie-node", ref, startedAt);
    },
});
