#!/usr/bin/env bun
/** 在 Bun 进程内加载 solvers/typescript/solution.ts 并执行 metadata.tests。 */
import { BUN_BENCH_PARAMS } from "../src/runner/bench-params.ts";
import { benchBunSolverInProcess, runBunSolverOnce } from "../src/runner/bun-solver-runtime.ts";

function parseCount(value: string | undefined, flag: string): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
        throw new Error(`invalid ${flag}=${String(value)}`);
    }
    return Math.floor(parsed);
}

async function main(): Promise<number> {
    const args = process.argv.slice(2);
    let index = 0;
    const benchMode = args[0] === "--bench";
    if (benchMode) {
        index = 1;
    }
    const problemDir = args[index];
    if (!problemDir) {
        console.error("usage: bun run scripts/run_bun_solver.ts <problem-dir>");
        console.error("       bun run scripts/run_bun_solver.ts --bench <problem-dir>");
        return 2;
    }

    let iterations = BUN_BENCH_PARAMS.iterations;
    let warmup = BUN_BENCH_PARAMS.warmup;
    if (benchMode) {
        const iterFlag = args.indexOf("--iterations");
        if (iterFlag >= 0) {
            iterations = parseCount(args[iterFlag + 1], "--iterations");
        }
        const warmupFlag = args.indexOf("--warmup");
        if (warmupFlag >= 0) {
            warmup = parseCount(args[warmupFlag + 1], "--warmup");
        }
    }

    if (benchMode) {
        const runtimeMs = await benchBunSolverInProcess(problemDir, iterations, warmup);
        console.log(JSON.stringify({ runtimeMs }));
        return 0;
    }

    await runBunSolverOnce(problemDir);
    return 0;
}

main().catch((err) => {
    console.error(String(err));
    process.exit(1);
});
