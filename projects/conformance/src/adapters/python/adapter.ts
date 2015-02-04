import { collectPythonBenchEnvironment } from "../../reporting/environment.ts";
import { defineSolverAdapter } from "../factory.ts";
import { runResultFromReference } from "../shared/correctness-result.ts";
import { benchPythonProblem } from "./bench.ts";
import {
    hasPythonSolver,
    pythonRefReady,
    pythonSkipReason,
    runPythonSolver,
} from "./ref.ts";

export const pythonAdapter = defineSolverAdapter({
    implementationId: "python",
    hasSolver: hasPythonSolver,
    runnerReady: pythonRefReady,
    blockedReason: pythonSkipReason,
    collectEnvironment: collectPythonBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: benchPythonProblem(problem) };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasPythonSolver(problemRoot)) {
            return runResultFromReference(
                problem,
                "python",
                { ok: false, stderr: "solver not found" },
                startedAt,
                "solver not found",
            );
        }
        const ref = runPythonSolver({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, "python", ref, startedAt);
    },
});
