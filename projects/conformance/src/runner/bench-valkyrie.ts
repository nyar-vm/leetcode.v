import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("valkyrie", "bench-valkyrie");

export const runValkyrieBenchmarks = entry.runBenchmarks;
export const benchValkyrieMain = entry.main;
