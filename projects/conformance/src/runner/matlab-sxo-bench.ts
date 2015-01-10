import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { SXO_BENCH_PARAMS } from "./bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { benchMatlabSxoSolverInProcess } from "./matlab-sxo-ref.ts";
import { hasMatlabSxoSolver } from "./sxo-solver-shared.ts";

export function benchMatlabSxoProblem(
    problem: ProblemDefinition,
    iterations = SXO_BENCH_PARAMS.iterations,
    warmup = SXO_BENCH_PARAMS.warmup,
): Promise<number> {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasMatlabSxoSolver(root)) {
        throw new Error(`missing solvers/matlab-sxo/solution.m for ${problem.id}`);
    }
    return benchMatlabSxoSolverInProcess(root, iterations, warmup);
}
