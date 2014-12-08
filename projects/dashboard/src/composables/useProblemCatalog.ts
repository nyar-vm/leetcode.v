import type { BenchRow, EnrichedBenchRow } from "../types/bench";

export function enrichBenchRow(row: BenchRow): EnrichedBenchRow {
    return {
        ...row,
        questionId: row.questionId ?? 0,
        difficulty: row.difficulty ?? "Unknown",
        tags: row.tags ?? [],
    };
}

export function enrichBenchRows(rows: BenchRow[]): EnrichedBenchRow[] {
    return rows.map(enrichBenchRow);
}

export function allTags(rows: EnrichedBenchRow[]): string[] {
    const tags = new Set<string>();
    for (const row of rows) {
        for (const tag of row.tags) {
            tags.add(tag);
        }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
}

export function leetcodeUrl(id: string): string {
    return `https://leetcode.com/problems/${id}/`;
}
