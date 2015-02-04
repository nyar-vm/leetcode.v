import { collectTypeScriptBenchEnvironment } from "../../reporting/environment.ts";
import { defineSolverAdapter } from "../factory.ts";
import { runResultFromReference } from "../shared/correctness-result.ts";
import { benchTsProblem } from "./bench.ts";
import { hasReadyTsSolver, runTsReference } from "./ref.ts";

export const typescriptNodeAdapter = defineSolverAdapter({
    implementationId: "typescript-node",
    hasSolver: hasReadyTsSolver,
    runnerReady: () => true,
    collectEnvironment: collectTypeScriptBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchTsProblem(problem) };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasReadyTsSolver(problemRoot)) {
            return runResultFromReference(
                problem,
                "typescript-node",
                { ok: false, stderr: "solver not found" },
                startedAt,
                "solver not found",
            );
        }
        const ref = await runTsReference({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, "typescript-node", ref, startedAt);
    },
});
