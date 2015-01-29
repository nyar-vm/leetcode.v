import type { ProblemDefinition } from "../../catalog/index.ts";
import { problemDir } from "../../catalog/index.ts";
import { SXO_BENCH_PARAMS } from "../../planning/bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "../../domain/paths.ts";
import { benchMatlabSxoSolverInProcess } from "./ref.ts";
import { hasMatlabSxoSolver } from "../shared/sxo-solver-shared.ts";

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
