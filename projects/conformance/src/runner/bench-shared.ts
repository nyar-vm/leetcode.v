import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { ProblemDefinition } from "../catalog.ts";
import { PROBLEMS, problemDir } from "../catalog.ts";
import { problemsForBatch } from "../batch-limit.ts";
import { hasPythonSolver } from "./python-ref.ts";
import { hasReadyTsSolver } from "./ts-ref.ts";
import { hasMatlabSxoSolver, hasWolframSxoSolver } from "./sxo-solver-shared.ts";
import { hasValkyrieSolver } from "./valkyrie.ts";
import type { BenchLanguage, LanguageBenchReport } from "./bench-types.ts";
import { BENCH_JSON_FILES } from "./bench-types.ts";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");

export const BENCH_PUBLIC_DIR = join(LEETCODE_ROOT, "projects", "dashboard", "public");

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

export function parseBenchLanguages(): BenchLanguage[] | "all" {
    const raw = process.env.LEETCODE_BENCH_LANG?.trim().toLowerCase();
    if (!raw || raw === "all") {
        return "all";
    }
    const parts = raw
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
    const langs: BenchLanguage[] = [];
    for (const part of parts) {
        if (part === "python" || part === "py") {
            langs.push("python");
        } else if (part === "typescript" || part === "ts") {
            langs.push("typescript");
        } else if (part === "valkyrie" || part === "v") {
            langs.push("valkyrie");
        } else {
            throw new Error(
                `无效的 LEETCODE_BENCH_LANG=${part}（可用 python、typescript、valkyrie、all）`,
            );
        }
    }
    return langs.length > 0 ? langs : "all";
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
        if (language === "python") {
            return hasPythonSolver(root);
        }
        if (language === "typescript") {
            return hasReadyTsSolver(root);
        }
        if (language === "wolfram-sxo") {
            return hasWolframSxoSolver(root);
        }
        if (language === "matlab-sxo") {
            return hasMatlabSxoSolver(root);
        }
        return hasValkyrieSolver(root);
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

export function mergeErrors(left: string | null, right: string | null): string | null {
    if (left && right) {
        return `${left}; ${right}`;
    }
    return left ?? right;
}
