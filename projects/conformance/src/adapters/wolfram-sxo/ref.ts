import type { ProblemDefinition } from "../../catalog/index.ts";
import { benchSxoSolverInProcess, runSxoSolverOnce, WOLFRAM_SXO_RUNNER } from "../shared/sxo-runner.ts";
import { hasWolframSxoSolver, problemRootFor } from "../shared/sxo-solver-shared.ts";
import { sxoRunnerReady, sxoSkipReason } from "../shared/sxo-bridge.ts";

export { hasWolframSxoSolver };

export async function runWolframSxoSolverOnce(problemRoot: string): Promise<void> {
    return runSxoSolverOnce(problemRoot, WOLFRAM_SXO_RUNNER);
}

export async function benchWolframSxoSolverInProcess(problemRoot: string, iterations: number, warmup: number): Promise<number> {
    return benchSxoSolverInProcess(problemRoot, iterations, warmup, WOLFRAM_SXO_RUNNER);
}

export async function runWolframSxoReference(problem: ProblemDefinition): Promise<{ ok: boolean; stderr: string }> {
    if (!sxoRunnerReady()) {
        return { ok: false, stderr: sxoSkipReason() ?? "@sxo/* 未安装" };
    }
    const root = problemRootFor(problem);
    if (!hasWolframSxoSolver(root)) {
        return { ok: false, stderr: "missing ready solvers/wolfram-sxo/solution.wl" };
    }
    try {
        await runWolframSxoSolverOnce(root);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
