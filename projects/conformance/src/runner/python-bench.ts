import { spawnSync } from "node:child_process";

import { join } from "node:path";

import type { ProblemDefinition } from "../catalog.ts";

import { problemDir } from "../catalog.ts";

import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";

import { hasPythonSolver } from "./python-ref.ts";

function median(values: number[]): number {
    if (values.length === 0) {
        return 0;
    }

    const sorted = [...values].sort((a, b) => a - b);

    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }

    return sorted[mid];
}

export function benchPythonProblem(problem: ProblemDefinition, iterations = 5, warmup = 1): number {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);

    if (!hasPythonSolver(root)) {
        throw new Error(`missing solvers/python/solution.py for ${problem.id}`);
    }

    const argv = [CHECKER, root];

    for (let i = 0; i < warmup; i++) {
        const warm = spawnSync("python", argv, { encoding: "utf8" });

        if (warm.status !== 0) {
            throw new Error(warm.stderr || "python warmup failed");
        }
    }

    const samples: number[] = [];

    for (let i = 0; i < iterations; i++) {
        const start = performance.now();

        const result = spawnSync("python", argv, { encoding: "utf8" });

        if (result.status !== 0) {
            throw new Error(result.stderr || "python bench failed");
        }

        samples.push(performance.now() - start);
    }

    return median(samples);
}
