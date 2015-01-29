import type { ProblemDefinition } from "../catalog/index.ts";
import type { LanguageBenchEnvironment, BenchLanguage } from "../reporting/schema.ts";

export type SolverReferenceResult = { ok: boolean; stderr: string };

export type BenchProblemOutcome = {
    runtimeMs?: number | null;
    compileMs?: number | null;
    legionRoute?: string | null;
    benchTarget?: string;
    error?: string | null;
};

/** 历史基准插件形状；新代码应优先实现 `SolverAdapter`。 */
export interface LanguageBenchPlugin {
    readonly language: BenchLanguage;
    hasSolver(problemRoot: string): boolean;
    runnerReady(): boolean;
    collectEnvironment(): LanguageBenchEnvironment;
    benchProblem(problem: ProblemDefinition): Promise<BenchProblemOutcome>;
    reportExtras?(): Record<string, unknown>;
}

export interface LanguageReferencePlugin {
    readonly language: BenchLanguage;
    hasSolver(problemRoot: string): boolean;
    runnerReady(): boolean;
    runReference(problem: ProblemDefinition): Promise<SolverReferenceResult>;
}
