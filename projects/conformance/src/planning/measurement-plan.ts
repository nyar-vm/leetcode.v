import type { MeasurementPlan } from "../domain/measurement.ts";

const DIFFICULTY_BUDGET: Record<string, { timeoutMs: number; timeBudgetMs: number }> = {
    Easy: { timeoutMs: 30_000, timeBudgetMs: 120_000 },
    Medium: { timeoutMs: 60_000, timeBudgetMs: 300_000 },
    Hard: { timeoutMs: 120_000, timeBudgetMs: 600_000 },
    Unknown: { timeoutMs: 60_000, timeBudgetMs: 300_000 },
};

/** 按题目难度选择初始预算；实际次数由执行器按波动与预算动态决定。 */
export function defaultMeasurementPlan(
    difficulty: string,
    boundary: MeasurementPlan["boundary"] = "metadata-tests",
): MeasurementPlan {
    const budget = DIFFICULTY_BUDGET[difficulty] ?? DIFFICULTY_BUDGET.Unknown;
    return {
        boundary,
        difficulty,
        inputScale: "medium",
        timeoutMs: budget.timeoutMs,
        timeBudgetMs: budget.timeBudgetMs,
        warmupRuns: 3,
        minValidSamples: 5,
        maxAttempts: 50,
        maxRelativeSpread: 0.15,
        interleaveRuntimes: true,
    };
}
