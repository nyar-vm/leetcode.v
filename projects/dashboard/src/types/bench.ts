export type BenchRow = {
    id: string;
    title: string;
    questionId?: number;
    difficulty?: string;
    tags?: string[];
    pyRuntimeMs: number | null;
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    wlRuntimeMs: number | null;
    mlRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    pyError?: string | null;
    tsError?: string | null;
    vError?: string | null;
    wlError?: string | null;
    mlError?: string | null;
    error: string | null;
};

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
    runtimeStatus: "pending-invoke-harness";
    aggregation: "median";
    compileRuns: number;
    warmup: number;
    host: HostEnvironment;
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

export type BenchEnvironments = {
    python: PythonBenchEnvironment | null;
    typescript: TypeScriptBenchEnvironment | null;
    valkyrie: ValkyrieBenchEnvironment | null;
    wolframSxo: WolframSxoBenchEnvironment | null;
    matlabSxo: MatlabSxoBenchEnvironment | null;
};

export type BenchReportSource = {
    generatedAt: string;
    ready: boolean;
    rowCount: number;
    benchTarget?: string;
};

export type BenchReport = {
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal?: number;
    rows: BenchRow[];
    sources?: {
        python: BenchReportSource | null;
        typescript: BenchReportSource | null;
        valkyrie: BenchReportSource | null;
        wolframSxo: BenchReportSource | null;
        matlabSxo: BenchReportSource | null;
    };
    environments?: BenchEnvironments;
};

export type EnrichedBenchRow = BenchRow & {
    questionId: number;
    difficulty: string;
    tags: string[];
};

export type Difficulty = "Easy" | "Medium" | "Hard";

export type BenchStatus = "all" | "ok" | "error" | "v-faster" | "ts-faster" | "missing";

export type SortKey =
    | "id"
    | "title"
    | "difficulty"
    | "pyRuntimeMs"
    | "tsRuntimeMs"
    | "vCompileMs"
    | "vRuntimeMs"
    | "wlRuntimeMs"
    | "mlRuntimeMs"
    | "ratio"
    | "fastest";

export type BenchFilterMode = "full" | "ts-v";

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export type BenchFilters = {
    query: string;
    difficulties: Difficulty[];
    tags: string[];
    status: BenchStatus;
    sort: SortKey;
    sortDesc: boolean;
    page: number;
    pageSize: number;
};
