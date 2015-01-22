import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("typescript-bun", "bench-typescript-bun");

export const runTypeScriptBunBenchmarks = entry.runBenchmarks;
export const benchTypeScriptBunMain = entry.main;
