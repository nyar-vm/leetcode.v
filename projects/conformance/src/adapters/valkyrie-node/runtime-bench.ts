import { spawnSync } from "node:child_process";
import { join } from "node:path";

import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../../catalog/index.ts";
import { problemDir } from "../../catalog/index.ts";
import { PYTHON_BENCH_PARAMS } from "../../planning/bench-params.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "../../domain/paths.ts";
import { resolveVBuildArtifacts, wasmInvokeBlockedReason } from "./ref.ts";

const RUNNER = join(
    LEETCODE_ROOT_FROM_PACKAGE,
    "projects",
    "conformance",
    "scripts",
    "run_v_solver.ts",
);

function spawnVSolver(problemRoot: string): { status: number | null; stderr: string } {
    const result = spawnSync(process.execPath, ["--import", "tsx", RUNNER, problemRoot], {
        encoding: "utf8",
        cwd: join(LEETCODE_ROOT_FROM_PACKAGE, "projects", "conformance"),
    });
    const stderr = `${result.stderr ?? ""}${result.stdout ?? ""}`.trim();
    return { status: result.status, stderr };
}

export function benchVRuntimeProblem(
    problem: ProblemDefinition,
    iterations = PYTHON_BENCH_PARAMS.iterations,
    warmup = PYTHON_BENCH_PARAMS.warmup,
): number {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    const artifacts = resolveVBuildArtifacts(problem);
    if (!artifacts) {
        throw new Error("missing legion build artifacts (run legion build first)");
    }
    const blocked = wasmInvokeBlockedReason(artifacts.entry.legionWasm);
    if (blocked) {
        throw new Error(blocked);
    }

    for (let i = 0; i < warmup; i++) {
        const warm = spawnVSolver(root);
        if (warm.status !== 0) {
            throw new Error(warm.stderr || "valkyrie runtime warmup failed");
        }
    }

    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        const result = spawnVSolver(root);
        if (result.status !== 0) {
            throw new Error(result.stderr || "valkyrie runtime bench failed");
        }
        samples.push(performance.now() - start);
    }
    return median(samples);
}
