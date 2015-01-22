import type { ProblemDefinition } from "../catalog.ts";
import type { BenchLanguage, LanguageBenchEnvironment } from "../runner/bench-types.ts";

export type SolverReferenceResult = { ok: boolean; stderr: string };

/** 单题基准结果；各语言只填充自己需要的字段。 */
export type BenchProblemOutcome = {
    runtimeMs?: number | null;
    compileMs?: number | null;
    legionRoute?: string | null;
    benchTarget?: string;
    error?: string | null;
};

/**
 * 语言基准插件：探测求解器、采集环境、对单题计时。
 * bench 编排层只依赖此接口，不直接 import 各语言 `*-ref.ts`。
 */
export interface LanguageBenchPlugin {
    readonly language: BenchLanguage;
    hasSolver(problemRoot: string): boolean;
    runnerReady(): boolean;
    collectEnvironment(): LanguageBenchEnvironment;
    benchProblem(problem: ProblemDefinition): Promise<BenchProblemOutcome>;
    /** 写入 report 顶层的额外字段（如 Valkyrie `benchTarget`）。 */
    reportExtras?(): Record<string, unknown>;
}

/**
 * 语言正确性插件：跑一遍 `metadata.tests`（完备性矩阵用）。
 */
export interface LanguageReferencePlugin {
    readonly language: BenchLanguage;
    hasSolver(problemRoot: string): boolean;
    runnerReady(): boolean;
    runReference(problem: ProblemDefinition): Promise<SolverReferenceResult>;
}
