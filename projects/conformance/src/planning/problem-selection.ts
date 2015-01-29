import type { ProblemSpec } from "../domain/problem.ts";
import { LEETCODE_ROOT } from "../domain/paths.ts";
import { loadProblemMetadata } from "../domain/metadata.ts";
import { problemsForBatch } from "../planning/batch-limit.ts";
import { PROBLEMS, problemDir } from "../catalog/index.ts";

const problemMetaById = new Map(PROBLEMS.map((problem) => [problem.id, problem]));

export function toProblemSpec(problem: (typeof PROBLEMS)[number]): ProblemSpec {
    const meta = problemMetaById.get(problem.id);
    const root = problemDir(LEETCODE_ROOT, problem);
    const metadata = loadProblemMetadata(root);
    return {
        id: problem.id,
        title: problem.title,
        questionId: meta?.questionId ?? 0,
        difficulty: meta?.difficulty ?? "Unknown",
        tags: meta?.tags ?? [],
        tests: metadata.tests,
        invoke: metadata.invoke,
    };
}

function applyIdFilter(list: (typeof PROBLEMS)[number][]): (typeof PROBLEMS)[number][] {
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

export function selectedProblems(): (typeof PROBLEMS)[number][] {
    const idFilter = process.env.LEETCODE_BENCH_ID ?? process.env.LEETCODE_BENCH_IDS;
    if (idFilter) {
        return applyIdFilter([...PROBLEMS]);
    }
    return problemsForBatch(PROBLEMS, { fallbackKeys: ["LEETCODE_BENCH_LIMIT"] });
}

export function metaForProblem(problem: (typeof PROBLEMS)[number]) {
    const meta = problemMetaById.get(problem.id);
    return {
        title: problem.title,
        questionId: meta?.questionId ?? 0,
        difficulty: meta?.difficulty ?? "Unknown",
        tags: meta?.tags ?? [],
    };
}
