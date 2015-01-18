import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { BUN_BENCH_PARAMS } from "./bench-params.ts";
import { benchBunSolverViaSpawn } from "./bun-ref.ts";
import { hasReadyTsSolver } from "./ts-ref.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";

export function benchBunProblem(
    problem: ProblemDefinition,
    iterations = BUN_BENCH_PARAMS.iterations,
    warmup = BUN_BENCH_PARAMS.warmup,
): number {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasReadyTsSolver(root)) {
        throw new Error(`missing ready solvers/typescript/solution.ts for ${problem.id}`);
    }
    return benchBunSolverViaSpawn(root, iterations, warmup);
}
