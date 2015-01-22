import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("typescript", "bench-typescript");

export const runTypeScriptBenchmarks = entry.runBenchmarks;
export const benchTypeScriptMain = entry.main;
