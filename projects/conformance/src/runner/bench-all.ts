import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { runBenchmarkSuite, WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import { PROBLEMS, legionProjectDir, problemDir } from "../catalog.ts";
import { problemsForBatch } from "../batch-limit.ts";
import { benchTsProblem } from "./ts-bench.ts";
import { hasTsSolver } from "./ts-ref.ts";
import { valkyrieBenchmarkRunner } from "./valkyrie.ts";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");

export type BenchRow = {
    id: string;
    title: string;
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    error: string | null;
};

function benchProblems() {
    const idFilter = process.env.LEETCODE_BENCH_ID ?? process.env.LEETCODE_BENCH_IDS;
    let list = problemsForBatch(PROBLEMS, { fallbackKeys: ["LEETCODE_BENCH_LIMIT"] });
    if (idFilter) {
        const ids = new Set(
            idFilter
                .split(/[,;]/)
                .map((item) => item.trim())
                .filter(Boolean),
        );
        list = list.filter((problem) => ids.has(problem.id));
    }
    return list.filter((problem) => hasTsSolver(problemDir(LEETCODE_ROOT, problem)));
}

export async function runAllBenchmarks(): Promise<{
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    rows: BenchRow[];
}> {
    const benchTarget = WASM_NODE_BENCH_TARGET;
    const problems = benchProblems();

    const report = await runBenchmarkSuite(
        valkyrieBenchmarkRunner,
        problems.map((problem) => ({
            id: problem.id,
            title: problem.title,
            projectDir: legionProjectDir(LEETCODE_ROOT, problem),
            measureReference: () => benchTsProblem(problem),
        })),
        { runs: 3, target: benchTarget },
    );

    const rows: BenchRow[] = report.rows.map((row) => ({
        id: row.id,
        title: row.title,
        tsRuntimeMs: row.referenceMs,
        vCompileMs: row.legionCompileMs,
        vRuntimeMs: row.legionRuntimeMs,
        legionRoute: row.legionRoute,
        benchTarget,
        error: row.error,
    }));

    return { generatedAt: report.generatedAt, ready: report.ready, benchTarget, rows };
}

async function main() {
    const report = await runAllBenchmarks();
    const outPath = join(
        LEETCODE_ROOT,
        "projects",
        "dashboard",
        "public",
        "benchmark-results.json",
    );
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
}

const invokedDirectly = process.argv[1]?.includes("bench-all");
if (invokedDirectly) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
