import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { SXO_BENCH_PARAMS } from "./bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { benchWolframSxoSolverInProcess } from "./wolfram-sxo-ref.ts";
import { hasWolframSxoSolver } from "./sxo-solver-shared.ts";

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
