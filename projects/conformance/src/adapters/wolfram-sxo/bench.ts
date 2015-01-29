import type { ProblemDefinition } from "../../catalog/index.ts";
import { problemDir } from "../../catalog/index.ts";
import { SXO_BENCH_PARAMS } from "../../planning/bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "../../domain/paths.ts";
import { benchWolframSxoSolverInProcess } from "./ref.ts";
import { hasWolframSxoSolver } from "../shared/sxo-solver-shared.ts";

export function benchWolframSxoProblem(
    problem: ProblemDefinition,
    iterations = SXO_BENCH_PARAMS.iterations,
    warmup = SXO_BENCH_PARAMS.warmup,
): Promise<number> {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasWolframSxoSolver(root)) {
        throw new Error(`missing solvers/wolfram-sxo/solution.wl for ${problem.id}`);
    }
    return benchWolframSxoSolverInProcess(root, iterations, warmup);
}
