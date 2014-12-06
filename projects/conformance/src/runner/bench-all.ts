import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import { PROBLEMS, problemDir } from "../catalog.ts";
import { problemsForBatch } from "../batch-limit.ts";
import { benchTsProblem } from "./ts-bench.ts";
import { hasTsSolver } from "./ts-ref.ts";
import { benchValkyrieProblem } from "./v-bench.ts";
import { valkyrieRunnerReady } from "./valkyrie.ts";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");

export type BenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    error: string | null;
};

const problemMetaById = new Map(PROBLEMS.map((problem) => [problem.id, problem]));

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

function mergeErrors(left: string | null, right: string | null): string | null {
    if (left && right) {
        return `${left}; ${right}`;
    }
    return left ?? right;
}

export async function runAllBenchmarks(): Promise<{
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal: number;
    rows: BenchRow[];
}> {
    const benchTarget = WASM_NODE_BENCH_TARGET;
    const problems = benchProblems();
    const rows: BenchRow[] = [];

    for (const problem of problems) {
        const meta = problemMetaById.get(problem.id);
        let tsRuntimeMs: number | null = null;
        let error: string | null = null;

        try {
            tsRuntimeMs = benchTsProblem(problem);
        } catch (err) {
            error = `reference: ${String(err)}`;
        }

        const vBench = benchValkyrieProblem(problem);
        error = mergeErrors(error, vBench.error);

        rows.push({
            id: problem.id,
            title: problem.title,
            questionId: meta?.questionId ?? 0,
            difficulty: meta?.difficulty ?? "Unknown",
            tags: meta?.tags ?? [],
            tsRuntimeMs,
            vCompileMs: vBench.vCompileMs,
            vRuntimeMs: vBench.vRuntimeMs,
            legionRoute: vBench.legionRoute,
            benchTarget,
            error,
        });
    }

    return {
        generatedAt: new Date().toISOString(),
        ready: valkyrieRunnerReady(),
        benchTarget,
        catalogTotal: PROBLEMS.length,
        rows,
    };
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
