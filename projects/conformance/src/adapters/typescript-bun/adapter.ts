import { collectTypeScriptBunBenchEnvironment } from "../../reporting/environment.ts";
import { defineSolverAdapter } from "../factory.ts";
import { runResultFromReference } from "../shared/correctness-result.ts";
import { benchBunProblem } from "./bench.ts";
import { bunRunnerReady, bunSkipReason } from "./bridge.ts";
import { hasReadyTsSolver, runBunReference } from "./ref.ts";

export const typescriptBunAdapter = defineSolverAdapter({
    implementationId: "typescript-bun",
    hasSolver: hasReadyTsSolver,
    runnerReady: bunRunnerReady,
    blockedReason: bunSkipReason,
    collectEnvironment: collectTypeScriptBunBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: benchBunProblem(problem) };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasReadyTsSolver(problemRoot)) {
            return runResultFromReference(problem, "typescript-bun", { ok: false, stderr: "solver not found" }, startedAt, "solver not found");
        }
        const ref = await runBunReference({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, "typescript-bun", ref, startedAt);
    },
});
