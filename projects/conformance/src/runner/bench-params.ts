/** 各语言外部 harness 默认计时参数（写入 benchmark-*.json environment）。 */

export const PYTHON_BENCH_PARAMS = {
    iterations: 5,
    warmup: 1,
    aggregation: "median" as const,
    metric: "runtime" as const,
};

export const TYPESCRIPT_BENCH_PARAMS = {
    iterations: 50,
    warmup: 5,
    aggregation: "median" as const,
    metric: "runtime" as const,
    runner: "tsx" as const,
};

export const VALKYRIE_BENCH_PARAMS = {
    compileRuns: 3,
    warmup: 1,
    aggregation: "median" as const,
    compileMetric: "compile" as const,
    runtimeMetric: "runtime" as const,
    runtimeStatus: "blocked-stub-wasm" as const,
};
