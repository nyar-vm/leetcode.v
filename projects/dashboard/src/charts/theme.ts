import type { Config } from "vega-lite";

export const chartConfig: Config = {
    background: "transparent",
    font: "Segoe UI, PingFang SC, Microsoft YaHei, system-ui, sans-serif",
    axis: {
        labelColor: "#94a3b8",
        titleColor: "#b8c4d6",
        gridColor: "#243041",
        domainColor: "#334155",
    },
    legend: {
        labelColor: "#94a3b8",
        titleColor: "#b8c4d6",
    },
    title: {
        color: "#edf2f7",
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
