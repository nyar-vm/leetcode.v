import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../../catalog/index.ts";
import { problemDir, valkyrieProjectDir } from "../../catalog/index.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "../../domain/paths.ts";
import { VALKYRIE_BENCH_PARAMS } from "../../planning/bench-params.ts";
import { benchVRuntimeProblem } from "./runtime-bench.ts";
import { loadMetadata, resolveVBuildArtifacts, wasmInvokeBlockedReason } from "./ref.ts";
import {
    formatLegionError,
    legionBuild,
    valkyrieRunnerReady,
    valkyrieSkipReason,
} from "./valkyrie.ts";

export type ValkyrieBenchResult = {
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    error: string | null;
};

/**
 * leetcode 外部基准的 V 侧：对 `legion build --target node` 计时。
 * 运行时分：对 wasm 产物跑 `run_v_solver.ts`（`metadata.tests`）。
 * wasm 空壳或 glue 未接线时 `vRuntimeMs` 为 null 且 `error` 说明原因。
 */
export function benchValkyrieProblem(
    problem: ProblemDefinition,
    compileRuns = VALKYRIE_BENCH_PARAMS.compileRuns,
    warmup = VALKYRIE_BENCH_PARAMS.warmup,
): ValkyrieBenchResult {
    if (!valkyrieRunnerReady()) {
        return {
            vCompileMs: null,
            vRuntimeMs: null,
            legionRoute: null,
            error: valkyrieSkipReason(),
        };
    }

    const projectDir = valkyrieProjectDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    const outDir = join(LEETCODE_ROOT_FROM_PACKAGE, ".cache", `${problem.id}-bench-node`);
    mkdirSync(outDir, { recursive: true });

    let legionRoute: string | null = null;

    for (let i = 0; i < warmup; i++) {
        const warm = legionBuild(projectDir, outDir);
        legionRoute = warm.route;
        if (warm.status !== 0) {
            return {
                vCompileMs: null,
                vRuntimeMs: null,
                legionRoute,
                error: formatLegionError("legion build", warm),
            };
        }
    }

    const compileSamples: number[] = [];
    for (let i = 0; i < compileRuns; i++) {
        const start = performance.now();
        const build = legionBuild(projectDir, outDir);
        legionRoute = build.route;
        if (build.status !== 0) {
            return {
                vCompileMs: null,
                vRuntimeMs: null,
                legionRoute,
                error: formatLegionError("legion build", build),
            };
        }
        compileSamples.push(performance.now() - start);
    }

    let vRuntimeMs: number | null = null;
    let runtimeError: string | null = null;

    const artifacts = resolveVBuildArtifacts(problem);
    if (artifacts) {
        const problemRoot = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
        const { invoke } = loadMetadata(problemRoot);
        const entry = invoke.valkyrie ?? invoke.typescript;
        const blocked = wasmInvokeBlockedReason(artifacts.entry.legionWasm, entry);
        if (blocked) {
            runtimeError = blocked;
        } else {
            try {
                vRuntimeMs = benchVRuntimeProblem(problem);
            } catch (err) {
                runtimeError = String(err);
            }
        }
    } else {
        runtimeError = "legion build 产物缺失";
    }

    return {
        vCompileMs: median(compileSamples),
        vRuntimeMs,
        legionRoute,
        error: runtimeError,
    };
}
