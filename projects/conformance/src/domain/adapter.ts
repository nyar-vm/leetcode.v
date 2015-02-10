import type { ProblemSpec } from './problem.ts';
import type { RunResult } from './result.ts';
import type { MeasurementOutcome, MeasurementPlan } from './measurement.ts';

export type AdapterEnvironment = {
    implementationId: string;
    ready: boolean;
    blockedReason: string | null;
    details: Record<string, unknown>;
};

/** 语言适配器合同：只负责本工具链的发现、准备、调用与环境描述。 */
export interface SolverAdapter {
    readonly implementationId: string;

    discover(problemRoot: string): boolean;

    prepare(problem: ProblemSpec, problemRoot: string): Promise<{ ok: boolean; error?: string }>;

    invokeCorrectness(problem: ProblemSpec, problemRoot: string): Promise<RunResult>;

    invokeBenchmark(
        problem: ProblemSpec,
        problemRoot: string,
        plan: MeasurementPlan,
    ): Promise<{ result: RunResult; measurement: MeasurementOutcome }>;

    describeEnvironment(): AdapterEnvironment;
}
