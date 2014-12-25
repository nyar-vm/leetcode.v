import type { TopLevelSpec } from "vega-lite";

import type { ThemeMode } from "../composables/useTheme";
import { getChartConfig, languageColor, statusColor } from "./theme";

const statusScale = {
    domain: Object.keys(statusColor),
    range: Object.values(statusColor).map(([color]) => color),
};

function baseSpec(spec: TopLevelSpec, theme: ThemeMode): TopLevelSpec {
    return {
        ...spec,
        config: getChartConfig(theme),
    };
}

export function statusDonutSpec(
    data: { label: string; count: number }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "跑测状态",
            width: DONUT_SIZE,
            height: DONUT_SIZE,
            data: { values: data },
            mark: { type: "arc", innerRadius: 56, tooltip: true },
            encoding: {
                theta: { field: "count", type: "quantitative" },
                color: {
                    field: "label",
                    type: "nominal",
                    legend: { orient: "bottom" },
                    scale: statusScale,
                },
            },
        },
        theme,
    );
}

const languageScale = {
    domain: Object.keys(languageColor),
    range: Object.values(languageColor),
};

const DONUT_SIZE = 260;
const BAR_BAND = { paddingInner: 0.18, paddingOuter: 0.06 };

function compactBarWidth(categoryCount: number): number {
    return Math.min(400, Math.max(280, categoryCount * 68 + 88));
}

export function languageWinBarSpec(
    data: { language: string; winCount: number }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length || data.every((item) => item.winCount === 0)) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "第一名数量",
            width: compactBarWidth(data.length),
            height: 240,
            data: { values: data },
            mark: { type: "bar", cornerRadiusEnd: 2, tooltip: true, size: 52 },
            encoding: {
                x: {
                    field: "language",
                    type: "nominal",
                    title: null,
                    sort: { field: "winCount", order: "descending" },
                    scale: BAR_BAND,
                },
                y: {
                    field: "winCount",
                    type: "quantitative",
                    title: "题目数",
                },
                color: {
                    field: "language",
                    type: "nominal",
                    legend: null,
                    scale: languageScale,
                },
                tooltip: [
                    { field: "language", title: "语言" },
                    { field: "winCount", title: "第一名" },
                ],
            },
        },
        theme,
    );
}

export function languageLogBarSpec(
    data: { language: string; value: number }[],
    title: string,
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title,
            width: compactBarWidth(data.length),
            height: 240,
            data: { values: data },
            mark: { type: "bar", cornerRadiusEnd: 2, tooltip: true, size: 52 },
            encoding: {
                x: {
                    field: "language",
                    type: "nominal",
                    title: null,
                    sort: { field: "value", order: "ascending" },
                    scale: BAR_BAND,
                },
                y: {
                    field: "value",
                    type: "quantitative",
                    title: "ln(ms)",
                },
                color: {
                    field: "language",
                    type: "nominal",
                    legend: null,
                    scale: languageScale,
                },
                tooltip: [
                    { field: "language", title: "语言" },
                    { field: "value", title: "ln(ms)", format: ".3f" },
                ],
            },
        },
        theme,
    );
}

export function languageViolinSpec(
    data: { language: string; logMs: number; runtimeMs: number; title: string }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "Violin · ln(ms)",
            data: { values: data },
            facet: {
                column: {
                    field: "language",
                    type: "nominal",
                    title: null,
                    sort: languageScale.domain,
                    header: { labelAlign: "left", labelAngle: 0, labelPadding: 6 },
                },
            },
            spec: {
                width: 88,
                height: 260,
                layer: [
                    {
                        transform: [{ density: "logMs", extent: "extent", as: ["logMs", "density"] }],
                        mark: { type: "area", orient: "horizontal", opacity: 0.75 },
                        encoding: {
                            y: { field: "logMs", type: "quantitative", title: "ln(ms)" },
                            x: { field: "density", type: "quantitative", axis: null, title: null },
                            color: {
                                field: "language",
                                type: "nominal",
                                legend: null,
                                scale: languageScale,
                            },
                        },
                    },
                    {
                        mark: {
                            type: "circle",
                            size: 70,
                            opacity: 0.95,
                            stroke: "white",
                            strokeWidth: 1,
                        },
                        encoding: {
                            y: { field: "logMs", type: "quantitative" },
                            color: {
                                field: "language",
                                type: "nominal",
                                legend: null,
                                scale: languageScale,
                            },
                            tooltip: [
                                { field: "title", title: "题目" },
                                { field: "runtimeMs", title: "ms", format: ".2f" },
                                { field: "logMs", title: "ln(ms)", format: ".3f" },
                            ],
                        },
                    },
                ],
            },
            resolve: { scale: { y: "shared" } },
        },
        theme,
    );
}

export function languageEcdfSpec(
    data: { language: string; logMs: number; runtimeMs: number; title: string }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "ECDF · ln(ms)",
            width: 440,
            height: 280,
            data: { values: data },
            transform: [
                {
                    window: [{ op: "row_number", as: "rank" }],
                    sort: [{ field: "logMs", order: "ascending" }],
                    groupby: ["language"],
                },
                {
                    joinaggregate: [{ op: "count", as: "n" }],
                    groupby: ["language"],
                },
                { calculate: "datum.rank / datum.n", as: "ecdf" },
            ],
            layer: [
                {
                    mark: { type: "line", interpolate: "step-after", strokeWidth: 2 },
                    encoding: {
                        x: { field: "logMs", type: "quantitative", title: "ln(ms)" },
                        y: {
                            field: "ecdf",
                            type: "quantitative",
                            title: "累计比例",
                            scale: { domain: [0, 1] },
                            axis: { format: "%" },
                        },
                        color: {
                            field: "language",
                            type: "nominal",
                            scale: languageScale,
                            legend: { orient: "bottom" },
                        },
                        tooltip: [
                            { field: "language", title: "语言" },
                            { field: "title", title: "题目" },
                            { field: "runtimeMs", title: "ms", format: ".2f" },
                            { field: "ecdf", title: "累计比例", format: ".0%" },
                        ],
                    },
                },
                {
                    mark: { type: "point", filled: true, size: 55, opacity: 0.85 },
                    encoding: {
                        x: { field: "logMs", type: "quantitative" },
                        y: { field: "ecdf", type: "quantitative" },
                        color: {
                            field: "language",
                            type: "nominal",
                            scale: languageScale,
                            legend: null,
                        },
                        tooltip: [
                            { field: "language", title: "语言" },
                            { field: "title", title: "题目" },
                            { field: "runtimeMs", title: "ms", format: ".2f" },
                            { field: "ecdf", title: "累计比例", format: ".0%" },
                        ],
                    },
                },
            ],
        },
        theme,
    );
}

export function scatterSpec(
    data: {
        title: string;
        tsRuntimeMs: number;
        vRuntimeMs: number;
        difficulty: string;
    }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "TS vs V (wasm) 运行时间",
            width: "container",
            height: 280,
            data: { values: data },
            mark: { type: "point", filled: true, size: 90, tooltip: true },
            encoding: {
                x: {
                    field: "tsRuntimeMs",
                    type: "quantitative",
                    title: "TypeScript (ms)",
                    scale: { type: "symlog" },
                },
                y: {
                    field: "vRuntimeMs",
                    type: "quantitative",
                    title: "V (wasm) (ms)",
                    scale: { type: "symlog" },
                },
                color: {
                    field: "difficulty",
                    type: "nominal",
                    scale: {
                        domain: ["Easy", "Medium", "Hard", "Unknown"],
                        range: ["#34d399", "#fbbf24", "#fb7185", "#64748b"],
                    },
                },
                tooltip: [
                    { field: "title", title: "题目" },
                    { field: "tsRuntimeMs", title: "TS (ms)", format: ".2f" },
                    { field: "vRuntimeMs", title: "V (ms)", format: ".2f" },
                    { field: "difficulty", title: "难度" },
                ],
            },
        },
        theme,
    );
}

export function tsRuntimeBarSpec(
    data: { title: string; tsRuntimeMs: number; difficulty: string }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "TypeScript 运行时间 Top",
            width: "container",
            height: Math.max(220, data.length * 22),
            data: { values: data },
            mark: { type: "bar", cornerRadiusEnd: 1, tooltip: true },
            encoding: {
                y: {
                    field: "title",
                    type: "nominal",
                    sort: "-x",
                    title: null,
                },
                x: {
                    field: "tsRuntimeMs",
                    type: "quantitative",
                    title: "ms",
                },
                color: {
                    field: "difficulty",
                    type: "nominal",
                    legend: { orient: "top" },
                    scale: {
                        domain: ["Easy", "Medium", "Hard", "Unknown"],
                        range: ["#34d399", "#fbbf24", "#fb7185", "#64748b"],
                    },
                },
            },
        },
        theme,
    );
}

export function ratioBarSpec(
    data: { title: string; ratio: number; winner: string }[],
    theme: ThemeMode,
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec(
        {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "TS / V 比值（越小 V 越快）",
            width: "container",
            height: Math.max(220, data.length * 22),
            data: { values: data },
            mark: { type: "bar", cornerRadiusEnd: 1, tooltip: true },
            encoding: {
                y: {
                    field: "title",
                    type: "nominal",
                    sort: { field: "ratio", order: "ascending" },
                    title: null,
                },
                x: {
                    field: "ratio",
                    type: "quantitative",
                    title: "倍率",
                },
                color: {
                    field: "winner",
                    type: "nominal",
                    legend: { orient: "top" },
                    scale: {
                        domain: ["V 更快", "TS 更快", "持平"],
                        range: ["#34d399", "#fbbf24", "#94a3b8"],
                    },
                },
                tooltip: [
                    { field: "title", title: "题目" },
                    { field: "ratio", title: "TS/V", format: ".2f" },
                    { field: "winner", title: "领先" },
                ],
            },
        },
        theme,
    );
}
