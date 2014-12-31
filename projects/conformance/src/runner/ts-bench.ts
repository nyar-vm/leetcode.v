import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { TYPESCRIPT_BENCH_PARAMS } from "./bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { benchTsSolverInProcess, hasTsSolver } from "./ts-ref.ts";

export async function benchTsProblem(
    problem: ProblemDefinition,
    iterations = TYPESCRIPT_BENCH_PARAMS.iterations,
    warmup = TYPESCRIPT_BENCH_PARAMS.warmup,
): Promise<number> {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasTsSolver(root)) {
        throw new Error(`missing solvers/typescript/solution.ts for ${problem.id}`);
    }

    return benchTsSolverInProcess(root, iterations, warmup);
}
