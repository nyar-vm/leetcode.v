import type { EnrichedBenchRow } from "../types/bench";
import {
    computeLanguageStats,
    countTimedLanguages,
    RUNTIME_LANGUAGES,
} from "../utils/languageStats";

function jitterForKey(key: string): number {
    let hash = 0;
    for (let index = 0; index < key.length; index += 1) {
        hash = (hash * 31 + key.charCodeAt(index)) | 0;
    }
    return ((hash % 100) / 100 - 0.5) * 16;
}

export type LanguageLogSample = {
    language: string;
    logMs: number;
    runtimeMs: number;
    title: string;
    id: string;
    jitter: number;
};

/** 各语言逐题 ln(ms) 样本，供箱线图 / 抖动散点使用。 */
export function languageLogSamples(rows: EnrichedBenchRow[]): LanguageLogSample[] {
    const samples: LanguageLogSample[] = [];
    for (const language of RUNTIME_LANGUAGES) {
        for (const row of rows) {
            const runtimeMs = language.readRuntime(row);
            if (runtimeMs === null || runtimeMs <= 0 || !Number.isFinite(runtimeMs)) {
                continue;
            }
            samples.push({
                language: language.label,
                logMs: Math.log(runtimeMs),
                runtimeMs,
                title: row.title,
                id: row.id,
                jitter: jitterForKey(`${language.id}:${row.id}`),
            });
        }
    }
    return samples;
}
export type RowStatus = "error" | "complete" | "partial" | "empty";

export function rowStatus(row: EnrichedBenchRow): RowStatus {
    if (row.error) {
        return "error";
    }
    if (countTimedLanguages(row) === 3) {
        return "complete";
    }
    if (countTimedLanguages(row) > 0) {
        return "partial";
    }
    return "empty";
}

const statusLabels: Record<RowStatus, string> = {
    error: "错误",
    complete: "全语言计时",
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

export function languageWinCounts(rows: EnrichedBenchRow[]) {
    return computeLanguageStats(rows).map((item) => ({
        language: item.label,
        winCount: item.winCount,
    }));
}

function average(values: number[]): number | null {
    if (!values.length) {
        return null;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: number[]): number | null {
    if (!values.length) {
        return null;
    }
    const sorted = [...values].sort((left, right) => left - right);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

export function languageAvgLog(rows: EnrichedBenchRow[]) {
    return RUNTIME_LANGUAGES.map((language) => {
        const logs: number[] = [];
        for (const row of rows) {
            const runtimeMs = language.readRuntime(row);
            if (runtimeMs === null || runtimeMs <= 0 || !Number.isFinite(runtimeMs)) {
                continue;
            }
            logs.push(Math.log(runtimeMs));
        }
        const value = average(logs);
        if (value === null) {
            return null;
        }
        return { language: language.label, value };
    }).filter((item): item is { language: string; value: number } => item !== null);
}

export function languageMedianLog(rows: EnrichedBenchRow[]) {
    return RUNTIME_LANGUAGES.map((language) => {
        const logs: number[] = [];
        for (const row of rows) {
            const runtimeMs = language.readRuntime(row);
            if (runtimeMs === null || runtimeMs <= 0 || !Number.isFinite(runtimeMs)) {
                continue;
            }
            logs.push(Math.log(runtimeMs));
        }
        const value = median(logs);
        if (value === null) {
            return null;
        }
        return { language: language.label, value };
    }).filter((item): item is { language: string; value: number } => item !== null);
}
