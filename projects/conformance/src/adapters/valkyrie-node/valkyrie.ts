import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { VccCliSpawnResult } from "@valkyrie-language/vcc";
import { LEETCODE_ROOT } from "../../domain/paths.ts";
import {
    createBenchmarkRunner,
    formatLegionCliError,
    parseLegionBenchTable,
    WASM_NODE_BENCH_TARGET,
    type LegionBenchRow,
} from "@valkyrie-language/vcc/benchmark";

const VALKYRIE_RS_ROOT = process.env.VALKYRIE_RS_ROOT ?? join(LEETCODE_ROOT, "..", "valkyrie.rs");

export const VALKYRIE_WASM_COLLECT_DIR = join(VALKYRIE_RS_ROOT, "projects", "packages", "vcc-unknown-wasm32");

const runner = createBenchmarkRunner({
    valkyrieRsRoot: VALKYRIE_RS_ROOT,
    wasmCollectDir: VALKYRIE_WASM_COLLECT_DIR,
});

export type LegionOutcome = VccCliSpawnResult;

export function valkyrieSolverPath(problemRoot: string): string {
    return join(problemRoot, "solvers", "valkyrie", "solution.v");
}

/** 基准只跑非空且未标 `# 阻塞` 的 `solution.v`。 */
export function hasValkyrieSolver(problemRoot: string): boolean {
    try {
        const text = readFileSync(valkyrieSolverPath(problemRoot), "utf8").trim();
        return text.length > 0 && !text.startsWith("# 阻塞");
    } catch {
        return false;
    }
}

export function valkyrieRunnerReady(): boolean {
    return runner.ready();
}

export function valkyrieSkipReason(): string | null {
    return runner.skipReason();
}

export function spawnLegion(argv: string[]): LegionOutcome {
    return runner.spawnLegion(argv);
}

export function legionBuild(projectDir: string, outputDir: string): LegionOutcome {
    return runner.spawnLegion(["build", projectDir, "--target", "node", "-o", outputDir]);
}

export function legionTest(projectDir: string): LegionOutcome {
    return runner.spawnLegion(["test", projectDir, "-t", "node"]);
}

export type ParsedBenchRow = LegionBenchRow;

export { parseLegionBenchTable };

export function legionBench(projectDir: string, runs = 3): { outcome: LegionOutcome; rows: ParsedBenchRow[] } {
    const result = runner.benchProject(projectDir, { runs, target: WASM_NODE_BENCH_TARGET });
    return { outcome: result.outcome, rows: result.rows };
}

export function formatLegionError(label: string, outcome: LegionOutcome): string {
    return formatLegionCliError(label, outcome);
}

export { runner as valkyrieBenchmarkRunner };
