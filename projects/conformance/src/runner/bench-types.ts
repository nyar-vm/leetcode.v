export type BenchLanguage =
    | "python"
    | "typescript"
    | "valkyrie"
    | "wolfram-sxo"
    | "matlab-sxo";

export type HostEnvironment = {
    platform: string;
    arch: string;
    osRelease: string;
    nodeVersion: string;
};

export type PythonBenchEnvironment = {
    language: "python";
    runtimeVersion: string;
    metric: "runtime";
    timingScope: "in-process-metadata-tests";
    aggregation: "median";
    iterations: number;
    warmup: number;
    host: HostEnvironment;
};

export type TypeScriptBenchEnvironment = {
    language: "typescript";
    nodeVersion: string;
    tsxVersion: string | null;
    runner: "tsx";
    metric: "runtime";
    timingScope: "in-process-metadata-tests";
    aggregation: "median";
    iterations: number;
    warmup: number;
    host: HostEnvironment;
};

export type ValkyrieBenchEnvironment = {
    language: "valkyrie";
    legionVersion: string | null;
    legionRoute: string | null;
    benchTarget: string;
    runnerReady: boolean;
    skipReason: string | null;
    compileMetric: "compile";
    runtimeMetric: "runtime";
    runtimeStatus: "blocked-stub-wasm" | "ready";
    aggregation: "median";
    compileRuns: number;
    warmup: number;
    host: HostEnvironment;
};

export type LanguageBenchEnvironment =
    | PythonBenchEnvironment
    | TypeScriptBenchEnvironment
    | ValkyrieBenchEnvironment;

export type LanguageBenchRowBase = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    error: string | null;
};

export type PythonBenchRow = LanguageBenchRowBase & {
    runtimeMs: number | null;
};

export type TypeScriptBenchRow = LanguageBenchRowBase & {
    runtimeMs: number | null;
};

export type ValkyrieBenchRow = LanguageBenchRowBase & {
    compileMs: number | null;
    runtimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
};

export type PythonBenchReport = {
    language: "python";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment: PythonBenchEnvironment;
    rows: PythonBenchRow[];
};

export type TypeScriptBenchReport = {
    language: "typescript";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment: TypeScriptBenchEnvironment;
    rows: TypeScriptBenchRow[];
};

export type ValkyrieBenchReport = {
    language: "valkyrie";
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal: number;
    environment: ValkyrieBenchEnvironment;
    rows: ValkyrieBenchRow[];
};

export type WolframSxoBenchEnvironment = {
    language: "wolfram-sxo";
    sxoMathematicaVersion: string | null;
    runnerReady: boolean;
    skipReason: string | null;
    metric: "runtime";
    timingScope: "in-process-metadata-tests";
    aggregation: "median";
    iterations: number;
    warmup: number;
    host: HostEnvironment;
};

export type MatlabSxoBenchEnvironment = {
    language: "matlab-sxo";
    sxoMatlabVersion: string | null;
    runnerReady: boolean;
    skipReason: string | null;
    metric: "runtime";
    timingScope: "in-process-metadata-tests";
    aggregation: "median";
    iterations: number;
    warmup: number;
    host: HostEnvironment;
};

export type WolframSxoBenchRow = LanguageBenchRowBase & {
    runtimeMs: number | null;
};

export type MatlabSxoBenchRow = LanguageBenchRowBase & {
    runtimeMs: number | null;
};

export type WolframSxoBenchReport = {
    language: "wolfram-sxo";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment: WolframSxoBenchEnvironment;
    rows: WolframSxoBenchRow[];
};

export type MatlabSxoBenchReport = {
    language: "matlab-sxo";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment: MatlabSxoBenchEnvironment;
    rows: MatlabSxoBenchRow[];
};

export type LanguageBenchReport =
    | PythonBenchReport
    | TypeScriptBenchReport
    | ValkyrieBenchReport
    | WolframSxoBenchReport
    | MatlabSxoBenchReport;

export const BENCH_JSON_FILES: Record<BenchLanguage, string> = {
    python: "benchmark-python.json",
    typescript: "benchmark-typescript.json",
    valkyrie: "benchmark-valkyrie.json",
    "wolfram-sxo": "benchmark-wolfram-sxo.json",
    "matlab-sxo": "benchmark-matlab-sxo.json",
};
