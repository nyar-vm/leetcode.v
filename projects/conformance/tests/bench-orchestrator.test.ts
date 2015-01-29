import { describe, expect, it } from "vitest";

import { normalizeBenchLanguage } from "../src/planning/language-selection.ts";
import { metaForProblem } from "../src/planning/problem-selection.ts";
import { PROBLEMS } from "../src/catalog/index.ts";
import {
    ALL_BENCH_LANGUAGES,
    DEFAULT_BENCH_LANGUAGES,
    getLanguageBenchPlugin,
} from "../src/adapters/plugins.ts";

describe("bench language selection", () => {
    it("normalizes aliases", () => {
        expect(normalizeBenchLanguage("bun")).toBe("typescript-bun");
        expect(normalizeBenchLanguage("wl")).toBe("wolfram-sxo");
    });

    it("registers every bench language", () => {
        for (const language of ALL_BENCH_LANGUAGES) {
            expect(getLanguageBenchPlugin(language).language).toBe(language);
        }
    });

    it("keeps default all-languages set stable", () => {
        expect(DEFAULT_BENCH_LANGUAGES).toEqual(["python", "typescript", "valkyrie"]);
    });
});

describe("bench orchestrator metadata", () => {
    it("enriches catalog rows", () => {
        const problem = PROBLEMS.find((item) => item.id === "two-sum");
        expect(problem).toBeDefined();
        const meta = metaForProblem(problem!);
        expect(meta.questionId).toBeGreaterThan(0);
        expect(meta.difficulty).not.toBe("Unknown");
    });
});
