import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import type { ProblemDefinition } from "../catalog.ts";
import { PROBLEMS, problemDir } from "../catalog.ts";
import { problemsForBatch } from "../batch-limit.ts";
import { BENCH_PUBLIC_DIR, LEETCODE_ROOT } from "../core/paths.ts";
import type { BenchLanguage, LanguageBenchReport } from "../runner/bench-types.ts";
import { BENCH_JSON_FILES } from "../runner/bench-types.ts";
import { languagesToRun, parseBenchLanguages } from "./language-selection.ts";
import {
    getLanguageBenchPlugin,
    hasSolverForLanguage,
    LANGUAGE_BENCH_PLUGINS,
} from "../solvers/plugins.ts";
import type { BenchProblemOutcome, LanguageBenchPlugin } from "../solvers/types.ts";

const problemMetaById = new Map(PROBLEMS.map((problem) => [problem.id, problem]));

export function metaForProblem(problem: ProblemDefinition) {
    const meta = problemMetaById.get(problem.id);
    return {
        title: problem.title,
        questionId: meta?.questionId ?? 0,
        difficulty: meta?.difficulty ?? "Unknown",
        tags: meta?.tags ?? [],
    };
}

function applyIdFilter(list: ProblemDefinition[]): ProblemDefinition[] {
    const idFilter = process.env.LEETCODE_BENCH_ID ?? process.env.LEETCODE_BENCH_IDS;
    if (!idFilter) {
        return list;
    }
    const ids = new Set(
        idFilter
            .split(/[,;]/)
            .map((item) => item.trim())
            .filter(Boolean),
    );
    return list.filter((problem) => ids.has(problem.id));
}

/** 按批量限制与 id 过滤后的题目列表（不含语言就绪过滤）。 */
export function benchProblemCandidates(): ProblemDefinition[] {
    const idFilter = process.env.LEETCODE_BENCH_ID ?? process.env.LEETCODE_BENCH_IDS;
    if (idFilter) {
        return applyIdFilter([...PROBLEMS]);
    }
    return problemsForBatch(PROBLEMS, { fallbackKeys: ["LEETCODE_BENCH_LIMIT"] });
}

export function benchProblemsForLanguage(language: BenchLanguage): ProblemDefinition[] {
    const list = benchProblemCandidates();
    return list.filter((problem) => {
        const root = problemDir(LEETCODE_ROOT, problem);
        return hasSolverForLanguage(language, root);
    });
}

export function writeLanguageBenchReport(
    language: BenchLanguage,
    report: LanguageBenchReport,
): string {
    const outPath = join(BENCH_PUBLIC_DIR, BENCH_JSON_FILES[language]);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    return outPath;
}

function buildBenchRow(
    problem: ProblemDefinition,
    outcome: BenchProblemOutcome,
    error: string | null,
) {
    const meta = metaForProblem(problem);
    const row: Record<string, unknown> = {
        id: problem.id,
        ...meta,
        error: outcome.error ?? error,
    };
    if (outcome.runtimeMs !== undefined) {
        row.runtimeMs = outcome.runtimeMs;
    }
    if (outcome.compileMs !== undefined) {
        row.compileMs = outcome.compileMs;
    }
    if (outcome.legionRoute !== undefined) {
        row.legionRoute = outcome.legionRoute;
    }
    if (outcome.benchTarget !== undefined) {
        row.benchTarget = outcome.benchTarget;
    }
    return row;
}

export async function runLanguageBenchmark(
    plugin: LanguageBenchPlugin,
): Promise<LanguageBenchReport> {
    const problems = benchProblemsForLanguage(plugin.language);
    const rows = [];

    for (const problem of problems) {
        let outcome: BenchProblemOutcome = { runtimeMs: null };
        let error: string | null = null;
        try {
            outcome = await plugin.benchProblem(problem);
        } catch (err) {
            error = String(err);
            outcome = { runtimeMs: null };
        }
        rows.push(buildBenchRow(problem, outcome, error));
    }

    const report = {
        language: plugin.language,
        generatedAt: new Date().toISOString(),
        ready: plugin.runnerReady(),
        catalogTotal: PROBLEMS.length,
        environment: plugin.collectEnvironment(),
        rows,
        ...plugin.reportExtras?.(),
    };

    return report as LanguageBenchReport;
}

export async function benchLanguageMain(language: BenchLanguage): Promise<string> {
    const plugin = getLanguageBenchPlugin(language);
    const report = await runLanguageBenchmark(plugin);
    const outPath = writeLanguageBenchReport(language, report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

export async function runSelectedBenchmarks(
    selection: BenchLanguage[] | "all" = parseBenchLanguages(),
): Promise<{ languages: BenchLanguage[]; paths: string[] }> {
    const languages = languagesToRun(selection);
    const paths: string[] = [];

    for (const language of languages) {
        paths.push(await benchLanguageMain(language));
    }

    return { languages, paths };
}

/** 与历史导出兼容：跑默认语言集。 */
export async function runAllBenchmarks(): Promise<{ languages: BenchLanguage[]; paths: string[] }> {
    return runSelectedBenchmarks("all");
}

export function mergeErrors(left: string | null, right: string | null): string | null {
    if (left && right) {
        return `${left}; ${right}`;
    }
    return left ?? right;
}

export { parseBenchLanguages, languagesToRun, LANGUAGE_BENCH_PLUGINS };
