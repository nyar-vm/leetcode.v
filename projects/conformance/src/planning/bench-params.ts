/** 各语言外部 harness 默认计时参数（写入 benchmark-*.json environment）。 */

export const PYTHON_BENCH_PARAMS = {
    iterations: 50,
    warmup: 5,
    aggregation: 'median' as const,
    metric: 'runtime' as const,
    /** 单 Python 进程内加载题解后只计 metadata.tests 循环，不含每次冷启动解释器。 */
    timingScope: 'in-process-metadata-tests' as const,
};

export const TYPESCRIPT_BENCH_PARAMS = {
    iterations: 50,
    warmup: 5,
    aggregation: 'median' as const,
    metric: 'runtime' as const,
    runner: 'tsx' as const,
    /** 单进程内加载题解后只计 metadata.tests 循环，不含每次冷启动 Node。 */
    timingScope: 'in-process-metadata-tests' as const,
};

export const BUN_BENCH_PARAMS = {
    iterations: 50,
    warmup: 5,
    aggregation: 'median' as const,
    metric: 'runtime' as const,
    runner: 'bun' as const,
    /** Bun 子进程内加载题解后只计 metadata.tests 循环，不含每次冷启动 Bun。 */
    timingScope: 'in-process-metadata-tests' as const,
};

export const VALKYRIE_BENCH_PARAMS = {
    compileRuns: 3,
    warmup: 1,
    aggregation: 'median' as const,
    compileMetric: 'compile' as const,
    runtimeMetric: 'runtime' as const,
    runtimeStatus: 'blocked-stub-wasm' as const,
};

export const SXO_BENCH_PARAMS = {
    iterations: 50,
    warmup: 5,
    aggregation: 'median' as const,
    metric: 'runtime' as const,
    /** 单 Node 进程内复用 @sxo/* frontend，只计 metadata.tests 循环。 */
    timingScope: 'in-process-metadata-tests' as const,
};
