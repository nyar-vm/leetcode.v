import { spawnSync } from "node:child_process";
import { join } from "node:path";

import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { TYPESCRIPT_BENCH_PARAMS } from "./bench-params.ts";
import { hasTsSolver } from "./ts-ref.ts";

const RUNNER = join(
    LEETCODE_ROOT_FROM_PACKAGE,
    "projects",
    "conformance",
    "scripts",
    "run_ts_solver.ts",
);

function spawnTsSolver(problemRoot: string): { status: number | null; stderr: string } {
    const result = spawnSync(process.execPath, ["--import", "tsx", RUNNER, problemRoot], {
        encoding: "utf8",
        cwd: join(LEETCODE_ROOT_FROM_PACKAGE, "projects", "conformance"),
    });
    const stderr = `${result.stderr ?? ""}${result.stdout ?? ""}`.trim();
    return { status: result.status, stderr };
}

export function benchTsProblem(
    problem: ProblemDefinition,
    iterations = TYPESCRIPT_BENCH_PARAMS.iterations,
    warmup = TYPESCRIPT_BENCH_PARAMS.warmup,
): number {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasTsSolver(root)) {
        throw new Error(`missing solvers/typescript/solution.ts for ${problem.id}`);
    }

    for (let i = 0; i < warmup; i++) {
        const warm = spawnTsSolver(root);
        if (warm.status !== 0) {
            throw new Error(warm.stderr || "typescript warmup failed");
        }
    }

    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        const result = spawnTsSolver(root);
        if (result.status !== 0) {
            throw new Error(result.stderr || "typescript bench failed");
        }
        samples.push(performance.now() - start);
    }
    return median(samples);
}
