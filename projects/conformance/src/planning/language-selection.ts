import type { BenchLanguage } from "../reporting/schema.ts";
import { ALL_BENCH_LANGUAGES, DEFAULT_BENCH_LANGUAGES } from "../adapters/plugins.ts";

const LANGUAGE_ALIASES: Record<string, BenchLanguage> = {
    python: "python",
    py: "python",
    typescript: "typescript",
    ts: "typescript",
    "typescript-bun": "typescript-bun",
    "ts-bun": "typescript-bun",
    bun: "typescript-bun",
    valkyrie: "valkyrie",
    v: "valkyrie",
    "wolfram-sxo": "wolfram-sxo",
    wolfram: "wolfram-sxo",
    wl: "wolfram-sxo",
    "matlab-sxo": "matlab-sxo",
    matlab: "matlab-sxo",
    m: "matlab-sxo",
};

export function normalizeBenchLanguage(token: string): BenchLanguage {
    const key = token.trim().toLowerCase();
    const language = LANGUAGE_ALIASES[key];
    if (!language) {
        throw new Error(
            `无效的 LEETCODE_BENCH_LANG=${token}（可用 ${ALL_BENCH_LANGUAGES.join("、")}、all）`,
        );
    }
    return language;
}

export function parseBenchLanguages(): BenchLanguage[] | "all" {
    const raw = process.env.LEETCODE_BENCH_LANG?.trim().toLowerCase();
    if (!raw || raw === "all") {
        return "all";
    }
    const parts = raw
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
    if (parts.length === 0) {
        return "all";
    }
    return parts.map((part) => normalizeBenchLanguage(part));
}

export function languagesToRun(selection: BenchLanguage[] | "all"): BenchLanguage[] {
    if (selection === "all") {
        return [...DEFAULT_BENCH_LANGUAGES];
    }
    return selection;
}
