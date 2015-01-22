import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("wolfram-sxo", "bench-wolfram-sxo");

export const runWolframSxoBenchmarks = entry.runBenchmarks;
export const benchWolframSxoMain = entry.main;
