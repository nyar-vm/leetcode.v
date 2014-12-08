import type { EnrichedBenchRow } from "../types/bench";
import { runtimeRatio } from "../utils/format";

export type RowStatus = "error" | "complete" | "partial" | "empty";

export function rowStatus(row: EnrichedBenchRow): RowStatus {
    if (row.error) {
        return "error";
    }
    if (row.tsRuntimeMs !== null && row.vRuntimeMs !== null) {
        return "complete";
    }
    if (row.tsRuntimeMs !== null || row.vRuntimeMs !== null) {
        return "partial";
    }
    return "empty";
}

const statusLabels: Record<RowStatus, string> = {
    error: "错误",
    complete: "双端计时",
    partial: "部分计时",
    empty: "无计时",
};

export function statusBreakdown(rows: EnrichedBenchRow[]) {
    const counts = new Map<RowStatus, number>();
    for (const row of rows) {
        const status = rowStatus(row);
        counts.set(status, (counts.get(status) ?? 0) + 1);
    }
    return [...counts.entries()].map(([status, count]) => ({
        status,
        label: statusLabels[status],
        count,
    }));
}

export function difficultyBreakdown(rows: EnrichedBenchRow[]) {
    const counts = new Map<string, number>();
    for (const row of rows) {
        counts.set(row.difficulty, (counts.get(row.difficulty) ?? 0) + 1);
    }
    return [...counts.entries()]
        .map(([difficulty, count]) => ({ difficulty, count }))
        .sort((left, right) => left.difficulty.localeCompare(right.difficulty));
}

export function scatterPoints(rows: EnrichedBenchRow[]) {
    return rows
        .filter((row) => row.tsRuntimeMs !== null && row.vRuntimeMs !== null)
        .map((row) => ({
            id: row.id,
            title: row.title,
            difficulty: row.difficulty,
            tsRuntimeMs: row.tsRuntimeMs as number,
            vRuntimeMs: row.vRuntimeMs as number,
            ratio: runtimeRatio(row) as number,
        }));
}

export function tsRuntimeBars(rows: EnrichedBenchRow[], limit = 15) {
    return rows
        .filter((row) => row.tsRuntimeMs !== null)
        .sort((left, right) => (right.tsRuntimeMs ?? 0) - (left.tsRuntimeMs ?? 0))
        .slice(0, limit)
        .map((row) => ({
            title: row.title,
            tsRuntimeMs: row.tsRuntimeMs as number,
            difficulty: row.difficulty,
        }));
}

export function ratioBars(rows: EnrichedBenchRow[], limit = 15) {
    return rows
        .map((row) => ({ row, ratio: runtimeRatio(row) }))
        .filter((item): item is { row: EnrichedBenchRow; ratio: number } => item.ratio !== null)
        .sort((left, right) => left.ratio - right.ratio)
        .slice(0, limit)
        .map(({ row, ratio }) => ({
            title: row.title,
            ratio,
            winner: ratio < 1 ? "V 更快" : ratio > 1 ? "TS 更快" : "持平",
        }));
}
