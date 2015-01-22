import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("matlab-sxo", "bench-matlab-sxo");

export const runMatlabSxoBenchmarks = entry.runBenchmarks;
export const benchMatlabSxoMain = entry.main;
