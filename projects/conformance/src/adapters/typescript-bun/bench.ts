import type { ProblemDefinition } from '../../catalog/index.ts';
import { problemDir } from '../../catalog/index.ts';
import { BUN_BENCH_PARAMS } from '../../planning/bench-params.ts';
import { benchBunSolverViaSpawn } from './ref.ts';
import { hasReadyTsSolver } from './ref.ts';
import { LEETCODE_ROOT_FROM_PACKAGE } from '../../domain/paths.ts';

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
