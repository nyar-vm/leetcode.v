import type { Config } from "vega-lite";

import type { ThemeMode } from "../composables/useTheme";

const chartPalettes: Record<ThemeMode, { label: string; title: string; grid: string; axis: string; text: string }> =
    {
        dark: {
            label: "#94a3b8",
            title: "#b8c4d6",
            grid: "#243041",
            axis: "#334155",
            text: "#edf2f7",
        },
        light: {
            label: "#64748b",
            title: "#475569",
            grid: "#e2e8f0",
            axis: "#cbd5e1",
            text: "#0f172a",
        },
    };

export function getChartConfig(theme: ThemeMode): Config {
    const colors = chartPalettes[theme];
    return {
        background: "transparent",
        font: "Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif",
        axis: {
            labelColor: colors.label,
            titleColor: colors.title,
            gridColor: colors.grid,
            domainColor: colors.axis,
        },
        legend: {
            labelColor: colors.label,
            titleColor: colors.title,
        },
        title: {
            color: colors.text,
            fontSize: 14,
            fontWeight: 600,
        },
        view: {
            stroke: "transparent",
        },
        range: {
            category: ["#5b8cff", "#34d399", "#fbbf24", "#fb7185", "#a78bfa", "#38bdf8"],
        },
    };
}
export const palette = {
    text: "#edf2f7",
    muted: "#94a3b8",
    grid: "#243041",
    axis: "#334155",
    panel: "#151d2a",
    accent: "#5b8cff",
    accentDeep: "#3d6ef5",
    success: "#34d399",
    successDeep: "#10b981",
    warning: "#fbbf24",
    warningDeep: "#f59e0b",
    danger: "#fb7185",
    dangerDeep: "#f43f5e",
    neutral: "#64748b",
    purple: "#a78bfa",
};

export const difficultyColor: Record<string, string> = {
    Easy: palette.success,
    Medium: palette.warning,
    Hard: palette.danger,
    Unknown: palette.neutral,
};

export const statusColor: Record<string, [string, string]> = {
    错误: [palette.danger, palette.dangerDeep],
    全语言计时: [palette.success, palette.successDeep],
    部分计时: [palette.accent, palette.accentDeep],
    无计时: ["#64748b", "#475569"],
};

export const languageColor: Record<string, string> = {
    Python: "#fbbf24",
    TypeScript: "#5b8cff",
    "V (wasm)": "#34d399",
};

export const winnerColor: Record<string, [string, string]> = {
    "V 更快": [palette.success, palette.successDeep],
    "TS 更快": [palette.warning, palette.warningDeep],
    持平: ["#94a3b8", "#64748b"],
};

export function linearGradient(from: string, to: string) {
    return {
        type: "linear" as const,
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
            { offset: 0, color: from },
            { offset: 1, color: to },
        ],
    };
}

export const titleStyle = {
    textStyle: {
        color: palette.text,
        fontSize: 14,
        fontWeight: 600,
    },
    left: 0,
    top: 0,
};

export const axisStyle = {
    axisLine: { lineStyle: { color: palette.axis } },
    axisTick: { lineStyle: { color: palette.axis } },
    axisLabel: { color: palette.muted, fontSize: 11 },
    splitLine: { lineStyle: { color: palette.grid, type: "dashed" as const } },
};

export const tooltipStyle = {
    backgroundColor: "rgba(15, 20, 28, 0.94)",
    borderColor: "rgba(148, 163, 184, 0.22)",
    borderWidth: 1,
    padding: [10, 14],
    textStyle: { color: palette.text, fontSize: 12 },
    extraCssText: "box-shadow: 0 12px 32px rgba(0,0,0,0.35); border-radius: 10px;",
};
