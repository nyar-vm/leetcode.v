/** 计时边界：编译、加载、单次调用或整组测试，不可混为一个数。 */
export type MeasurementBoundary = 'compile' | 'load' | 'single-invoke' | 'metadata-tests';

export type StabilityVerdict = 'stable' | 'unstable' | 'insufficient';

/** 单题单实现的测量计划；次数由预算与波动决定，非全局固定值。 */
export type MeasurementPlan = {
    boundary: MeasurementBoundary;
    difficulty: string;
    inputScale: 'small' | 'medium' | 'large';
    timeoutMs: number;
    timeBudgetMs: number;
    warmupRuns: number;
    minValidSamples: number;
    maxAttempts: number;
    /** 相对中位数允许波动；未达则标 unstable。 */
    maxRelativeSpread: number;
    interleaveRuntimes: boolean;
};

export type BenchmarkSample = {
    attempt: number;
    boundary: MeasurementBoundary;
    durationMs: number;
    discarded: boolean;
    discardReason?: string;
};

export type AttemptRecord = {
    attempt: number;
    status: 'ok' | 'error' | 'timeout';
    durationMs: number;
    samples: BenchmarkSample[];
    diagnostics: string[];
    timestamp: string;
};

export type MeasurementOutcome = {
    plan: MeasurementPlan;
    attempts: AttemptRecord[];
    aggregation: 'median' | 'mean' | 'none';
    publishedValueMs: number | null;
    stability: StabilityVerdict;
    rawSamples: BenchmarkSample[];
};
