import type { TopLevelSpec } from "vega-lite";

import { chartConfig } from "./theme";

function baseSpec(spec: TopLevelSpec): TopLevelSpec {
    return {
        ...spec,
        config: chartConfig,
    };
}

export function statusDonutSpec(data: { label: string; count: number }[]): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        title: "跑测状态",
        width: 280,
        height: 280,
        data: { values: data },
        mark: { type: "arc", innerRadius: 56, tooltip: true },
        encoding: {
            theta: { field: "count", type: "quantitative" },
            color: {
                field: "label",
                type: "nominal",
                legend: { orient: "bottom" },
            },
        },
    });
}

export function difficultyBarSpec(data: { difficulty: string; count: number }[]): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        title: "难度分布",
        width: "container",
        height: 220,
        data: { values: data },
        mark: { type: "bar", cornerRadiusEnd: 4, tooltip: true },
        encoding: {
            x: {
                field: "difficulty",
                type: "nominal",
                sort: ["Easy", "Medium", "Hard", "Unknown"],
                title: null,
            },
            y: { field: "count", type: "quantitative", title: "题目数" },
            color: {
                field: "difficulty",
                type: "nominal",
                legend: null,
                scale: {
                    domain: ["Easy", "Medium", "Hard", "Unknown"],
                    range: ["#34d399", "#fbbf24", "#fb7185", "#64748b"],
                },
            },
        },
    });
}

export function scatterSpec(
    data: {
        title: string;
        tsRuntimeMs: number;
        vRuntimeMs: number;
        difficulty: string;
    }[],
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        title: "TS vs V Wasm 运行时间",
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
                title: "V Wasm (ms)",
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
    });
}

export function tsRuntimeBarSpec(
    data: { title: string; tsRuntimeMs: number; difficulty: string }[],
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        title: "TypeScript 运行时间 Top",
        width: "container",
        height: Math.max(220, data.length * 22),
        data: { values: data },
        mark: { type: "bar", cornerRadiusEnd: 4, tooltip: true },
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
    });
}

export function ratioBarSpec(
    data: { title: string; ratio: number; winner: string }[],
): TopLevelSpec | null {
    if (!data.length) {
        return null;
    }
    return baseSpec({
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        title: "TS / V 比值（越小 V 越快）",
        width: "container",
        height: Math.max(220, data.length * 22),
        data: { values: data },
        mark: { type: "bar", cornerRadiusEnd: 4, tooltip: true },
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
    });
}
