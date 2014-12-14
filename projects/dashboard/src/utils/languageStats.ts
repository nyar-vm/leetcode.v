import type { EnrichedBenchRow } from "../types/bench";
import { formatMs } from "./format";

export type RuntimeLanguageId = "python" | "typescript" | "valkyrie";

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
        label: "V Wasm",
        color: "#34d399",
        readRuntime: (row) => row.vRuntimeMs,
    },
];

export type LanguageStat = {
    id: RuntimeLanguageId;
    label: string;
    color: string;
    sampleCount: number;
    winCount: number;
    avgLogMs: number | null;
    medianLogMs: number | null;
    geoMeanMs: number | null;
};

function validRuntime(ms: number | null): number | null {
    if (ms === null || ms <= 0 || !Number.isFinite(ms)) {
        return null;
    }
    return ms;
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
    const candidates = RUNTIME_LANGUAGES
        .map((language) => ({
            id: language.id,
            ms: validRuntime(language.readRuntime(row)),
        }))
        .filter((item): item is { id: RuntimeLanguageId; ms: number } => item.ms !== null);

    if (!candidates.length) {
        return [];
    }

    const min = Math.min(...candidates.map((item) => item.ms));
    return candidates.filter((item) => item.ms === min).map((item) => item.id);
}

export function comparableRowCount(rows: EnrichedBenchRow[]): number {
    return rows.filter((row) => winnersForRow(row).length > 0 && countTimedLanguages(row) >= 2).length;
}

export function countTimedLanguages(row: EnrichedBenchRow): number {
    return RUNTIME_LANGUAGES.filter((language) => validRuntime(language.readRuntime(row)) !== null).length;
}

export function computeLanguageStats(rows: EnrichedBenchRow[]): LanguageStat[] {
    const winCounts = new Map<RuntimeLanguageId, number>(
        RUNTIME_LANGUAGES.map((language) => [language.id, 0]),
    );
    const logSamples = new Map<RuntimeLanguageId, number[]>(
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
            logSamples.get(language.id)?.push(Math.log(runtime));
        }
    }

    return RUNTIME_LANGUAGES.map((language) => {
        const logs = logSamples.get(language.id) ?? [];
        const avgLogMs = average(logs);
        return {
            id: language.id,
            label: language.label,
            color: language.color,
            sampleCount: logs.length,
            winCount: winCounts.get(language.id) ?? 0,
            avgLogMs,
            medianLogMs: median(logs),
            geoMeanMs: avgLogMs === null ? null : Math.exp(avgLogMs),
        };
    });
}

export function leadingLanguage(stats: LanguageStat[]): LanguageStat | null {
    const ranked = [...stats].filter((item) => item.winCount > 0).sort((left, right) => right.winCount - left.winCount);
    if (!ranked.length) {
        return null;
    }
    if (ranked.length > 1 && ranked[0].winCount === ranked[1].winCount) {
        return null;
    }
    return ranked[0];
}

export function formatLogMs(value: number | null): string {
    if (value === null || !Number.isFinite(value)) {
        return "—";
    }
    return value.toFixed(3);
}

export function formatGeoMeanHint(stat: LanguageStat): string {
    if (stat.geoMeanMs === null) {
        return "无有效样本";
    }
    return `几何均值 ${formatMs(stat.geoMeanMs)} ms`;
}
