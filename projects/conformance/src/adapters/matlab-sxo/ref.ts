import type { ProblemDefinition } from "../../catalog/index.ts";
import { benchSxoSolverInProcess, runSxoSolverOnce, MATLAB_SXO_RUNNER } from "../shared/sxo-runner.ts";
import { hasMatlabSxoSolver, problemRootFor } from "../shared/sxo-solver-shared.ts";
import { sxoRunnerReady, sxoSkipReason } from "../shared/sxo-bridge.ts";

export { hasMatlabSxoSolver };

export async function runMatlabSxoSolverOnce(problemRoot: string): Promise<void> {
    return runSxoSolverOnce(problemRoot, MATLAB_SXO_RUNNER);
}

export async function benchMatlabSxoSolverInProcess(problemRoot: string, iterations: number, warmup: number): Promise<number> {
    return benchSxoSolverInProcess(problemRoot, iterations, warmup, MATLAB_SXO_RUNNER);
}

export async function runMatlabSxoReference(problem: ProblemDefinition): Promise<{ ok: boolean; stderr: string }> {
    if (!sxoRunnerReady()) {
        return { ok: false, stderr: sxoSkipReason() ?? "@sxo/* 未安装" };
    }
    const root = problemRootFor(problem);
    if (!hasMatlabSxoSolver(root)) {
        return { ok: false, stderr: "missing ready solvers/matlab-sxo/solution.m" };
    }
    try {
        await runMatlabSxoSolverOnce(root);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
