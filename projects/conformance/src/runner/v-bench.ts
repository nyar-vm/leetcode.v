import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../catalog.ts";
import { valkyrieProjectDir } from "../catalog.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { formatLegionError, legionBuild, valkyrieRunnerReady, valkyrieSkipReason } from "./valkyrie.ts";

export type ValkyrieBenchResult = {
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    error: string | null;
};

/**
 * leetcode 外部基准的 V 侧：对 `legion build --target node` 计时。
 * 运行时分（对 wasm 产物跑 `metadata.tests`）待 wasm 导出 invoke 接线后补全；
 * 成功编译时 **不** 因缺少 `[benchmark]` 报错。
 */
export function benchValkyrieProblem(
    problem: ProblemDefinition,
    compileRuns = 3,
    warmup = 1,
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

    return {
        vCompileMs: median(compileSamples),
        vRuntimeMs: null,
        legionRoute,
        error: null,
    };
}
