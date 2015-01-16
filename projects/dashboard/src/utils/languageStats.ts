import type { EnrichedBenchRow } from "../types/bench";
import { formatMs } from "./format";

export type RuntimeLanguageId = "python" | "typescript" | "valkyrie" | "wolfram-sxo" | "matlab-sxo";

export type RuntimeLanguage = {
    id: RuntimeLanguageId;
    label: string;
    color: string;
    readRuntime: (row: EnrichedBenchRow) => number | null;
};

export const RUNTIME_LANGUAGES: RuntimeLanguage[] = [
    {
        id: "python",
        label: "Python",
        color: "#fbbf24",
        readRuntime: (row) => row.pyRuntimeMs,
    },
    {
        id: "typescript",
        label: "TypeScript",
        color: "#5b8cff",
        readRuntime: (row) => row.tsRuntimeMs,
    },
    {
        id: "valkyrie",
        label: "V (wasm)",
        color: "#34d399",
        readRuntime: (row) => row.vRuntimeMs,
    },
    {
        id: "wolfram-sxo",
        label: "Wolfram (sxo)",
        color: "#f472b6",
        readRuntime: (row) => row.wlRuntimeMs,
    },
    {
        id: "matlab-sxo",
        label: "MATLAB (sxo)",
        color: "#fb923c",
        readRuntime: (row) => row.mlRuntimeMs,
    },
];

export type LanguageStat = {
    id: RuntimeLanguageId;
    label: string;
    color: string;
    sampleCount: number;
    winCount: number;
    avgMs: number | null;
    medianMs: number | null;
    totalMs: number | null;
};

function validRuntime(ms: number | null): number | null {
    if (ms === null || ms <= 0 || !Number.isFinite(ms)) {
        return null;
    }
    return ms;
}

export const RUNTIME_RANK_LABELS: Record<1 | 2 | 3, string> = {
    1: "金",
    2: "银",
    3: "铜",
};

export type RankedRuntime = {
    rank: 1 | 2 | 3;
    id: RuntimeLanguageId;
    label: string;
    color: string;
    ms: number;
};

/** 单题有效运行时间升序前三（样本预览用）。 */
export function topRuntimesForRow(row: EnrichedBenchRow, limit = 3): RankedRuntime[] {
    const ranked = RUNTIME_LANGUAGES
        .map((language) => ({
            id: language.id,
            label: language.label,
            color: language.color,
            ms: validRuntime(language.readRuntime(row)),
        }))
        .filter((item): item is Omit<RankedRuntime, "rank"> & { ms: number } => item.ms !== null)
        .sort((left, right) => left.ms - right.ms)
        .slice(0, limit);

    return ranked.map((item, index) => ({
        rank: (index + 1) as 1 | 2 | 3,
        id: item.id,
        label: item.label,
        color: item.color,
        ms: item.ms,
    }));
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

function average(values: number[]): number | null {
    if (!values.length) {
        return null;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function winnersForRow(row: EnrichedBenchRow): RuntimeLanguageId[] {
    const candidates = RUNTIME_LANGUAGES.map((language) => ({
        id: language.id,
        ms: validRuntime(language.readRuntime(row)),
    })).filter((item): item is { id: RuntimeLanguageId; ms: number } => item.ms !== null);

    if (!candidates.length) {
        return [];
    }

    const min = Math.min(...candidates.map((item) => item.ms));
    return candidates.filter((item) => item.ms === min).map((item) => item.id);
}

export function comparableRowCount(rows: EnrichedBenchRow[]): number {
    return rows.filter((row) => winnersForRow(row).length > 0 && countTimedLanguages(row) >= 2)
        .length;
}

export function sumCompileMs(rows: EnrichedBenchRow[]): number | null {
    let total = 0;
    let count = 0;
    for (const row of rows) {
        const ms = row.vCompileMs;
        if (ms !== null && ms > 0 && Number.isFinite(ms)) {
            total += ms;
            count += 1;
        }
    }
    return count > 0 ? total : null;
}

export function sumRuntimeMs(rows: EnrichedBenchRow[]): number | null {
    let total = 0;
    let count = 0;
    for (const row of rows) {
        for (const language of RUNTIME_LANGUAGES) {
            const runtime = validRuntime(language.readRuntime(row));
            if (runtime !== null) {
                total += runtime;
                count += 1;
            }
        }
    }
    return count > 0 ? total : null;
}

export function countTimedLanguages(row: EnrichedBenchRow): number {
    return RUNTIME_LANGUAGES.filter((language) => validRuntime(language.readRuntime(row)) !== null)
        .length;
}

export function computeLanguageStats(rows: EnrichedBenchRow[]): LanguageStat[] {
    const winCounts = new Map<RuntimeLanguageId, number>(
        RUNTIME_LANGUAGES.map((language) => [language.id, 0]),
    );
    const samples = new Map<RuntimeLanguageId, number[]>(
        RUNTIME_LANGUAGES.map((language) => [language.id, []]),
    );

    for (const row of rows) {
        for (const winner of winnersForRow(row)) {
            winCounts.set(winner, (winCounts.get(winner) ?? 0) + 1);
        }

        for (const language of RUNTIME_LANGUAGES) {
            const runtime = validRuntime(language.readRuntime(row));
            if (runtime === null) {
                continue;
            }
            samples.get(language.id)?.push(runtime);
        }
    }

    return RUNTIME_LANGUAGES.map((language) => {
        const values = samples.get(language.id) ?? [];
        const avgMs = average(values);
        return {
            id: language.id,
            label: language.label,
            color: language.color,
            sampleCount: values.length,
            winCount: winCounts.get(language.id) ?? 0,
            avgMs,
            medianMs: median(values),
            totalMs: values.length > 0 ? values.reduce((sum, value) => sum + value, 0) : null,
        };
    });
}

export function leadingLanguage(stats: LanguageStat[]): LanguageStat | null {
    const ranked = [...stats]
        .filter((item) => item.winCount > 0)
        .sort((left, right) => right.winCount - left.winCount);
    if (!ranked.length) {
        return null;
    }
    if (ranked.length > 1 && ranked[0].winCount === ranked[1].winCount) {
        return null;
    }
    return ranked[0];
}

export function formatStatMs(value: number | null): string {
    if (value === null || !Number.isFinite(value)) {
        return "—";
    }
    return `${formatMs(value)} ms`;
}
