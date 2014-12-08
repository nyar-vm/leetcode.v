import type { EnrichedBenchRow } from "../types/bench";

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
