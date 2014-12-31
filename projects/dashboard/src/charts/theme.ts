import type { EChartsOption } from "echarts";

import type { ThemeMode } from "../composables/useTheme";

const chartUi: Record<
    ThemeMode,
    {
        text: string;
        muted: string;
        grid: string;
        axis: string;
        tooltipBg: string;
        tooltipBorder: string;
    }
> = {
    dark: {
        text: "#edf2f7",
        muted: "#94a3b8",
        grid: "#243041",
        axis: "#334155",
        tooltipBg: "rgba(15, 20, 28, 0.94)",
        tooltipBorder: "rgba(148, 163, 184, 0.22)",
    },
    light: {
        text: "#0f172a",
        muted: "#64748b",
        grid: "#e2e8f0",
        axis: "#cbd5e1",
        tooltipBg: "rgba(255, 255, 255, 0.96)",
        tooltipBorder: "rgba(15, 23, 42, 0.1)",
    },
};

export const palette = {
    accent: "#5b8cff",
    accentDeep: "#3d6ef5",
    success: "#34d399",
    successDeep: "#10b981",
    warning: "#fbbf24",
    warningDeep: "#f59e0b",
    danger: "#fb7185",
    dangerDeep: "#f43f5e",
    neutral: "#64748b",
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

export function getChartUi(theme: ThemeMode) {
    return chartUi[theme];
}

export function chartTitle(text: string, theme: ThemeMode): EChartsOption["title"] {
    const ui = getChartUi(theme);
    return {
        text,
        left: 0,
        top: 0,
        textStyle: {
            color: ui.text,
            fontSize: 14,
            fontWeight: 600,
        },
    };
}

export function chartLegend(theme: ThemeMode): EChartsOption["legend"] {
    const ui = getChartUi(theme);
    return {
        bottom: 0,
        textStyle: { color: ui.muted, fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
    };
}

export function chartTooltip(
    theme: ThemeMode,
    trigger: "item" | "axis" = "item",
): EChartsOption["tooltip"] {
    const ui = getChartUi(theme);
    return {
        trigger,
        backgroundColor: ui.tooltipBg,
        borderColor: ui.tooltipBorder,
        borderWidth: 1,
        padding: [10, 14],
        textStyle: { color: ui.text, fontSize: 12 },
        extraCssText: "box-shadow: 0 12px 32px rgba(0,0,0,0.12); border-radius: 10px;",
    };
}

export function categoryAxis(theme: ThemeMode, name?: string): EChartsOption["xAxis"] {
    const ui = getChartUi(theme);
    return {
        type: "category",
        name,
        nameTextStyle: { color: ui.muted, fontSize: 11 },
        axisLine: { lineStyle: { color: ui.axis } },
        axisTick: { lineStyle: { color: ui.axis } },
        axisLabel: { color: ui.muted, fontSize: 11 },
    };
}

export function valueAxis(
    theme: ThemeMode,
    name?: string,
    formatter?: string,
): EChartsOption["yAxis"] {
    const ui = getChartUi(theme);
    return {
        type: "value",
        name,
        nameTextStyle: { color: ui.muted, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
            color: ui.muted,
            fontSize: 11,
            formatter,
        },
        splitLine: { lineStyle: { color: ui.grid, type: "dashed" } },
    };
}

export function chartGrid(top = 44, bottom = 36): EChartsOption["grid"] {
    return {
        left: 48,
        right: 16,
        top,
        bottom,
        containLabel: true,
    };
}
