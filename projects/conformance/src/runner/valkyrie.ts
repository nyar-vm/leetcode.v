import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { VccCliSpawnResult } from "@valkyrie-language/vcc";
import {
    createBenchmarkRunner,
    formatLegionCliError,
    parseLegionBenchTable,
    WASM_NODE_BENCH_TARGET,
    type LegionBenchRow,
} from "@valkyrie-language/vcc/benchmark";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");
const VALKYRIE_RS_ROOT = process.env.VALKYRIE_RS_ROOT ?? join(LEETCODE_ROOT, "..", "valkyrie.rs");

export const VALKYRIE_WASM_COLLECT_DIR = join(
    VALKYRIE_RS_ROOT,
    "projects",
    "packages",
    "vcc-unknown-wasm32",
);

const runner = createBenchmarkRunner({
    valkyrieRsRoot: VALKYRIE_RS_ROOT,
    wasmCollectDir: VALKYRIE_WASM_COLLECT_DIR,
});

export type LegionOutcome = VccCliSpawnResult;

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

export function legionBench(
    projectDir: string,
    runs = 3,
): { outcome: LegionOutcome; rows: ParsedBenchRow[] } {
    const result = runner.benchProject(projectDir, { runs, target: WASM_NODE_BENCH_TARGET });
    return { outcome: result.outcome, rows: result.rows };
}

export function formatLegionError(label: string, outcome: LegionOutcome): string {
    return formatLegionCliError(label, outcome);
}

export { runner as valkyrieBenchmarkRunner };
