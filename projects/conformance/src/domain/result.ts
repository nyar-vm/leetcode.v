/** 运行终态；`blocked` 必须有机器可读原因，不计入通过率。 */
export type RunStatus = 'passed' | 'failed' | 'blocked';

export type CaseResult = {
    index: number;
    status: RunStatus;
    expected?: unknown;
    actual?: unknown;
    message?: string;
    durationMs?: number;
};

export type ToolchainIdentity = {
    implementationId: string;
    adapterVersion: string;
    runtime?: string;
    compiler?: string;
    artifacts?: Record<string, string>;
};

/** 单次运行的统一结果。 */
export type RunResult = {
    runId: string;
    problemId: string;
    implementationId: string;
    mode: 'correctness' | 'benchmark';
    status: RunStatus;
    blockedReason?: string;
    cases: CaseResult[];
    diagnostics: string[];
    toolchain: ToolchainIdentity;
    startedAt: string;
    finishedAt: string;
};
