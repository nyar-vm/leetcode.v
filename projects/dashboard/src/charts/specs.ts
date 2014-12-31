import type { EChartsOption } from "echarts";

import type { ThemeMode } from "../composables/useTheme";
import {
    chartGrid,
    chartLegend,
    chartTitle,
    chartTooltip,
    categoryAxis,
    getChartUi,
    languageColor,
    linearGradient,
    statusColor,
    valueAxis,
} from "./theme";

const LANGUAGE_ORDER = Object.keys(languageColor);

export function statusDonutOption(
    data: { label: string; count: number }[],
    theme: ThemeMode,
): EChartsOption | null {
    if (!data.length) {
        return null;
    }
    const ui = getChartUi(theme);
    return {
        title: chartTitle("跑测状态", theme),
        tooltip: chartTooltip(theme),
        legend: { ...chartLegend(theme), orient: "horizontal" },
        series: [
            {
                type: "pie",
                radius: ["42%", "68%"],
                center: ["50%", "52%"],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: theme === "dark" ? "#151d2a" : "#ffffff",
                    borderWidth: 2,
                },
                label: { color: ui.muted, fontSize: 11 },
                data: data.map((item) => {
                    const [from, to] = statusColor[item.label] ?? [ui.muted, ui.muted];
                    return {
                        name: item.label,
                        value: item.count,
                        itemStyle: { color: linearGradient(from, to) },
                    };
                }),
            },
        ],
    };
}

export function languageWinBarOption(
    data: { language: string; winCount: number }[],
    theme: ThemeMode,
): EChartsOption | null {
    if (!data.length || data.every((item) => item.winCount === 0)) {
        return null;
    }
    const sorted = [...data].sort((left, right) => right.winCount - left.winCount);
    return {
        title: {
            ...chartTitle("第一名数量", theme),
            padding: [0, 0, 10, 0],
        },
        tooltip: {
            ...chartTooltip(theme),
            formatter: (params) => {
                const item = Array.isArray(params) ? params[0] : params;
                if (!item || typeof item !== "object" || !("name" in item)) {
                    return "";
                }
                return `${String(item.name)}<br/>胜场 ${String(item.value ?? "")}`;
            },
        },
        grid: {
            left: 56,
            right: 16,
            top: 52,
            bottom: 36,
            containLabel: true,
        },
        xAxis: {
            ...categoryAxis(theme),
            data: sorted.map((item) => item.language),
        },
        yAxis: {
            ...valueAxis(theme, "胜场"),
            nameLocation: "middle",
            nameGap: 48,
            nameRotate: 90,
        },
        series: [
            {
                type: "bar",
                barMaxWidth: 52,
                data: sorted.map((item) => ({
                    value: item.winCount,
                    itemStyle: {
                        color: languageColor[item.language] ?? getChartUi(theme).muted,
                        borderRadius: [4, 4, 0, 0],
                    },
                })),
            },
        ],
    };
}

export function languageViolinOption(
    data: { language: string; logMs: number; runtimeMs: number; title: string; jitter: number }[],
    theme: ThemeMode,
): EChartsOption | null {
    if (!data.length) {
        return null;
    }

    const ui = getChartUi(theme);
    const languages = LANGUAGE_ORDER.filter((label) =>
        data.some((item) => item.language === label),
    );

    return {
        title: chartTitle("分布 · ln(ms)", theme),
        tooltip: {
            ...chartTooltip(theme),
            formatter: (params) => {
                const item = Array.isArray(params) ? params[0] : params;
                if (!item || typeof item !== "object" || !("data" in item)) {
                    return "";
                }
                const point = item.data as { title: string; runtimeMs: number; logMs: number };
                return `${point.title}<br/>${String(item.seriesName)}<br/>${point.runtimeMs.toFixed(2)} ms · ln ${point.logMs.toFixed(3)}`;
            },
        },
        legend: {
            ...chartLegend(theme),
            data: languages,
        },
        grid: chartGrid(44, 48),
        xAxis: {
            ...valueAxis(theme, "ln(ms)"),
            scale: true,
        },
        yAxis: {
            ...categoryAxis(theme),
            data: languages,
        },
        series: languages.map((language) => ({
            name: language,
            type: "scatter",
            symbolSize: data.filter((item) => item.language === language).length >= 2 ? 9 : 12,
            itemStyle: {
                color: languageColor[language] ?? ui.muted,
                opacity: 0.9,
            },
            data: data
                .filter((item) => item.language === language)
                .map((item) => ({
                    value: [item.logMs, language],
                    title: item.title,
                    runtimeMs: item.runtimeMs,
                    logMs: item.logMs,
                })),
        })),
    };
}

function buildEcdfSeries(
    data: { language: string; logMs: number; runtimeMs: number; title: string }[],
) {
    const grouped = new Map<string, typeof data>();
    for (const item of data) {
        const list = grouped.get(item.language) ?? [];
        list.push(item);
        grouped.set(item.language, list);
    }

    const series: EChartsOption["series"] = [];
    for (const language of LANGUAGE_ORDER) {
        const items = grouped.get(language);
        if (!items?.length) {
            continue;
        }
        const sorted = [...items].sort((left, right) => left.logMs - right.logMs);
        const points = sorted.map((item, index) => ({
            value: [item.logMs, (index + 1) / sorted.length] as [number, number],
            title: item.title,
            runtimeMs: item.runtimeMs,
        }));
        series.push({
            name: language,
            type: "line",
            step: "end",
            showSymbol: true,
            symbolSize: 6,
            lineStyle: { width: 2 },
            itemStyle: { color: languageColor[language] },
            data: points,
        });
    }
    return series;
}

export function languageEcdfOption(
    data: { language: string; logMs: number; runtimeMs: number; title: string }[],
    theme: ThemeMode,
): EChartsOption | null {
    if (!data.length) {
        return null;
    }
    const series = buildEcdfSeries(data);
    if (!series?.length) {
        return null;
    }

    return {
        title: chartTitle("ECDF · ln(ms)", theme),
        tooltip: {
            ...chartTooltip(theme),
            formatter: (params) => {
                const item = Array.isArray(params) ? params[0] : params;
                if (!item || typeof item !== "object" || !("data" in item)) {
                    return "";
                }
                const point = item.data as {
                    title: string;
                    runtimeMs: number;
                    value: [number, number];
                };
                const ratio = point.value[1];
                return `${point.title}<br/>${String(item.seriesName)}<br/>${point.runtimeMs.toFixed(2)} ms · 累计 ${(ratio * 100).toFixed(0)}%`;
            },
        },
        legend: chartLegend(theme),
        grid: chartGrid(44, 48),
        xAxis: {
            ...valueAxis(theme, "ln(ms)"),
            scale: true,
        },
        yAxis: {
            ...valueAxis(theme, "累计比例", (value) => `${Math.round(Number(value) * 100)}%`),
            min: 0,
            max: 1,
        },
        series,
    };
}
