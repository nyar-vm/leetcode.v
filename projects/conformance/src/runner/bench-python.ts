import { createBenchLanguageEntry } from "./bench-entry.ts";

const entry = createBenchLanguageEntry("python", "bench-python");

export const runPythonBenchmarks = entry.runBenchmarks;
export const benchPythonMain = entry.main;
