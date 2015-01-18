import type { EnrichedBenchRow } from "../types/bench";

export type RuntimeLanguage =
    | "Python"
    | "TypeScript"
    | "TypeScript (Bun)"
    | "V (wasm)"
    | "Wolfram (Sxo)"
    | "MATLAB (Sxo)";

export function fastestRuntime(
    row: EnrichedBenchRow,
): { label: RuntimeLanguage; ms: number } | null {
    const candidates: { label: RuntimeLanguage; ms: number }[] = [];
    if (row.pyRuntimeMs !== null) {
        candidates.push({ label: "Python", ms: row.pyRuntimeMs });
    }
    if (row.tsRuntimeMs !== null) {
        candidates.push({ label: "TypeScript", ms: row.tsRuntimeMs });
    }
    if (row.tbRuntimeMs !== null) {
        candidates.push({ label: "TypeScript (Bun)", ms: row.tbRuntimeMs });
    }
    if (row.vRuntimeMs !== null) {
        candidates.push({ label: "V (wasm)", ms: row.vRuntimeMs });
    }
    if (row.wlRuntimeMs !== null) {
        candidates.push({ label: "Wolfram (Sxo)", ms: row.wlRuntimeMs });
    }
    if (row.mlRuntimeMs !== null) {
        candidates.push({ label: "MATLAB (Sxo)", ms: row.mlRuntimeMs });
    }
    if (!candidates.length) {
        return null;
    }
    return candidates.reduce((best, item) => (item.ms < best.ms ? item : best));
}

export function fastestRuntimeMs(row: EnrichedBenchRow): number | null {
    return fastestRuntime(row)?.ms ?? null;
}

export function fastestLabel(row: EnrichedBenchRow): string {
    const winner = fastestRuntime(row);
    if (!winner) {
        return "—";
    }
    return `${winner.label} · ${formatMs(winner.ms)} ms`;
}

export function formatMs(value: number | null): string {
    if (value === null || Number.isNaN(value)) {
        return "—";
    }
    return value < 1 ? value.toFixed(3) : value.toFixed(2);
}

export function runtimeRatio(row: EnrichedBenchRow): number | null {
    if (row.tsRuntimeMs === null || row.vRuntimeMs === null || row.vRuntimeMs === 0) {
        return null;
    }
    return row.tsRuntimeMs / row.vRuntimeMs;
}

export function ratioLabel(row: EnrichedBenchRow): string {
    const ratio = runtimeRatio(row);
    if (ratio === null) {
        return "—";
    }
    return `${ratio.toFixed(2)}×`;
}

export function formatDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
        return iso;
    }
    return date.toLocaleString("zh-CN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
