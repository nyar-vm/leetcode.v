export { PROBLEMS, problemDir, type ProblemDefinition } from "./catalog.ts";

export { runAllBenchmarks, runSelectedBenchmarks } from "./runner/bench-all.ts";
export { mergeLanguageBenchReports, type BenchRow } from "./runner/bench-merge.ts";

export { runPythonReference, pythonRefReady } from "./runner/python-ref.ts";

export type { LanguageBenchPlugin, LanguageReferencePlugin } from "./solvers/types.ts";
export {
    ALL_BENCH_LANGUAGES,
    DEFAULT_BENCH_LANGUAGES,
    LANGUAGE_BENCH_PLUGINS,
    getLanguageBenchPlugin,
} from "./solvers/plugins.ts";
