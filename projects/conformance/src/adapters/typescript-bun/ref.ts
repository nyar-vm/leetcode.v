import type { ProblemDefinition } from '../../catalog/index.ts';
import { problemDir } from '../../catalog/index.ts';
import { BUN_BENCH_PARAMS } from '../../planning/bench-params.ts';
import { bunRunnerReady, bunSkipReason, spawnBunSolver } from './bridge.ts';
import { LEETCODE_ROOT_FROM_PACKAGE } from '../../domain/paths.ts';
import { hasReadyTsSolver, tsSolverPath } from './ref.ts';

export { hasReadyTsSolver as hasBunTsSolver };

export function runBunSolverViaSpawn(problemRoot: string, bench = false): void {
    const args = bench ? ['--bench', problemRoot] : [problemRoot];
    const result = spawnBunSolver(args);
    const stderr = `${result.stderr}${result.stdout}`.trim();
    if (result.status !== 0) {
        throw new Error(stderr || 'bun solver failed');
    }
    if (bench) {
        return;
    }
}

export function benchBunSolverViaSpawn(
    problemRoot: string,
    iterations = BUN_BENCH_PARAMS.iterations,
    warmup = BUN_BENCH_PARAMS.warmup,
): number {
    const result = spawnBunSolver(['--bench', problemRoot, '--iterations', String(iterations), '--warmup', String(warmup)]);
    const stderr = `${result.stderr}${result.stdout}`.trim();
    if (result.status !== 0) {
        throw new Error(stderr || 'bun bench failed');
    }
    const line = (result.stdout ?? '').trim().split(/\r?\n/).at(-1);
    if (!line) {
        throw new Error('bun bench returned empty output');
    }
    let parsed: { runtimeMs?: unknown };
    try {
        parsed = JSON.parse(line) as { runtimeMs?: unknown };
    } catch {
        throw new Error(`bun bench returned invalid JSON: ${line}`);
    }
    const runtimeMs = parsed.runtimeMs;
    if (typeof runtimeMs !== 'number' || !Number.isFinite(runtimeMs) || runtimeMs <= 0) {
        throw new Error(`bun bench returned invalid runtimeMs: ${String(runtimeMs)}`);
    }
    return runtimeMs;
}

export async function runBunReference(problem: ProblemDefinition): Promise<{ ok: boolean; stderr: string }> {
    if (!bunRunnerReady()) {
        return { ok: false, stderr: bunSkipReason() ?? 'Bun 未安装' };
    }
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasReadyTsSolver(root)) {
        return { ok: false, stderr: `missing ready ${tsSolverPath(root)}` };
    }
    try {
        runBunSolverViaSpawn(root);
        return { ok: true, stderr: '' };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
