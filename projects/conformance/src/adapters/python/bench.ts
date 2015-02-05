import { spawnSync } from "node:child_process";

import type { ProblemDefinition } from "../../catalog/index.ts";
import { problemDir } from "../../catalog/index.ts";
import { PYTHON_BENCH_PARAMS } from "../../planning/bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "../../domain/paths.ts";
import { hasPythonSolver, pythonSolverDir, PYTHON_BENCH_CHECKER } from "./ref.ts";

/** 单 Python 进程内预热后只对 metadata.tests 全量循环计时（对齐 TS）。 */
export function benchPythonProblem(
    problem: ProblemDefinition,
    iterations = PYTHON_BENCH_PARAMS.iterations,
    warmup = PYTHON_BENCH_PARAMS.warmup,
): number {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);

    if (!hasPythonSolver(root)) {
        throw new Error(`missing solvers/python/solution.py for ${problem.id}`);
    }

    const result = spawnSync(
        "python",
        [PYTHON_BENCH_CHECKER, root, "--bench", "--iterations", String(iterations), "--warmup", String(warmup)],
        {
            encoding: "utf8",
            cwd: pythonSolverDir(root),
        },
    );

    const stderr = `${result.stderr ?? ""}${result.stdout ?? ""}`.trim();
    if (result.status !== 0) {
        throw new Error(stderr || "python bench failed");
    }

    const line = (result.stdout ?? "").trim().split(/\r?\n/).at(-1);
    if (!line) {
        throw new Error("python bench returned empty output");
    }

    let parsed: { medianMs?: unknown };
    try {
        parsed = JSON.parse(line) as { medianMs?: unknown };
    } catch {
        throw new Error(`python bench returned invalid JSON: ${line}`);
    }

    const medianMs = parsed.medianMs;
    if (typeof medianMs !== "number" || !Number.isFinite(medianMs) || medianMs <= 0) {
        throw new Error(`python bench returned invalid medianMs: ${String(medianMs)}`);
    }

    return medianMs;
}
