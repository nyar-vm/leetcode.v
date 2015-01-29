import { randomUUID } from "node:crypto";

import type { RunRequest } from "../domain/run.ts";
import type { ImplementationId } from "../adapters/ids.ts";
import { ALL_IMPLEMENTATION_IDS, BENCH_LANGUAGE_TO_IMPLEMENTATION } from "../adapters/ids.ts";
import { DEFAULT_BENCH_LANGUAGES } from "../adapters/plugins.ts";
import { selectedProblems, toProblemSpec } from "./problem-selection.ts";
import { hasSolver } from "../adapters/registry.ts";
import { defaultMeasurementPlan } from "./measurement-plan.ts";

export type PlannedRun = {
    request: RunRequest;
    problem: ReturnType<typeof toProblemSpec>;
    executionNonce: string;
};

export function parseImplementationIds(): ImplementationId[] | "all" {
    const raw = process.env.LEETCODE_BENCH_LANG?.trim().toLowerCase();
    if (!raw || raw === "all") {
        return "all";
    }
    const parts = raw
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
    return parts.map((part) => {
        const id = BENCH_LANGUAGE_TO_IMPLEMENTATION[part];
        if (!id) {
            throw new Error(`无效语言 ${part}`);
        }
        return id;
    });
}

export function implementationsToRun(selection: ImplementationId[] | "all"): ImplementationId[] {
    if (selection === "all") {
        return DEFAULT_BENCH_LANGUAGES.map(
            (lang) => BENCH_LANGUAGE_TO_IMPLEMENTATION[lang] as ImplementationId,
        );
    }
    return selection;
}

export function planBenchmarkRuns(implementationIds: ImplementationId[]): PlannedRun[] {
    const plans: PlannedRun[] = [];
    const problems = selectedProblems();
    for (const problem of problems) {
        const spec = toProblemSpec(problem);
        for (const implementationId of implementationIds) {
            if (!hasSolver(implementationId, problem.id)) {
                continue;
            }
            plans.push({
                request: {
                    problemId: problem.id,
                    implementationId,
                    mode: "benchmark",
                    measurementPlan: defaultMeasurementPlan(spec.difficulty),
                },
                problem: spec,
                executionNonce: randomUUID(),
            });
        }
    }
    return plans;
}

export function planCorrectnessRuns(implementationIds: ImplementationId[]): PlannedRun[] {
    const plans: PlannedRun[] = [];
    const problems = selectedProblems();
    for (const problem of problems) {
        const spec = toProblemSpec(problem);
        for (const implementationId of implementationIds) {
            if (!hasSolver(implementationId, problem.id)) {
                continue;
            }
            plans.push({
                request: {
                    problemId: problem.id,
                    implementationId,
                    mode: "correctness",
                },
                problem: spec,
                executionNonce: randomUUID(),
            });
        }
    }
    return plans;
}

export { ALL_IMPLEMENTATION_IDS };
