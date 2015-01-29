import type { RunRequest } from "../domain/run.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import { LEETCODE_ROOT } from "../domain/paths.ts";
import { problemDir } from "../catalog/index.ts";
import { getAdapter } from "../adapters/registry.ts";
import { defaultMeasurementPlan } from "../planning/measurement-plan.ts";
import { buildRunId, digestSource } from "../reporting/cache/run-id.ts";
import { writeRunRecord } from "../reporting/cache/store.ts";
import type { RunRecord } from "../reporting/cache/types.ts";
import type { RunResult } from "../domain/result.ts";

const ADAPTER_VERSION = "0.2.0";

export async function runBenchmark(
    request: RunRequest,
    problem: ProblemSpec,
    executionNonce: string,
): Promise<RunRecord> {
    const adapter = getAdapter(request.implementationId);
    const problemRoot = problemDir(LEETCODE_ROOT, problem);
    const env = adapter.describeEnvironment();
    const plan = request.measurementPlan ?? defaultMeasurementPlan(problem.difficulty);

    if (!env.ready) {
        return blockedRecord(
            request,
            problem,
            env.blockedReason ?? "adapter not ready",
            plan,
            executionNonce,
        );
    }
    if (!adapter.discover(problemRoot)) {
        return blockedRecord(request, problem, "solver not found", plan, executionNonce);
    }

    const prepare = await adapter.prepare(problem, problemRoot);
    if (!prepare.ok) {
        return failedRecord(
            request,
            problem,
            prepare.error ?? "prepare failed",
            plan,
            executionNonce,
        );
    }

    const correctness = await adapter.invokeCorrectness(problem, problemRoot);
    if (correctness.status !== "passed") {
        return {
            manifest: buildManifest(request, problem, correctness, plan, executionNonce),
            result: {
                ...correctness,
                mode: "benchmark",
                status: correctness.status === "blocked" ? "blocked" : "failed",
                blockedReason:
                    correctness.status === "blocked"
                        ? correctness.blockedReason
                        : "correctness must pass before benchmark",
            },
        };
    }

    const { result, measurement } = await adapter.invokeBenchmark(problem, problemRoot, plan);
    const record: RunRecord = {
        manifest: buildManifest(request, problem, result, plan, executionNonce),
        result,
        measurement,
    };
    record.manifest.runId = buildRunId({
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "benchmark",
        sourceDigest: record.manifest.sourceDigest,
        adapterVersion: ADAPTER_VERSION,
        toolchainKey: JSON.stringify(env.details),
        measurementPlanKey: JSON.stringify(plan),
        executionNonce,
    });
    record.result.runId = record.manifest.runId;
    writeRunRecord(record);
    return record;
}

function buildManifest(
    request: RunRequest,
    problem: ProblemSpec,
    result: RunResult,
    plan: RunRequest["measurementPlan"],
    executionNonce: string,
): RunRecord["manifest"] {
    const sourceDigest = digestSource([
        problem.id,
        request.implementationId,
        JSON.stringify(problem.tests),
    ]);
    return {
        runId: "",
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "benchmark",
        createdAt: result.finishedAt,
        sourceDigest,
        adapterVersion: ADAPTER_VERSION,
        toolchain: result.toolchain as unknown as Record<string, unknown>,
        measurementPlan: plan as unknown as Record<string, unknown>,
        profile: request.profile,
    };
}

function blockedRecord(
    request: RunRequest,
    problem: ProblemSpec,
    reason: string,
    plan: RunRequest["measurementPlan"],
    executionNonce: string,
): RunRecord {
    const finishedAt = new Date().toISOString();
    const result: RunResult = {
        runId: "",
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "benchmark",
        status: "blocked",
        blockedReason: reason,
        cases: [],
        diagnostics: [],
        toolchain: { implementationId: request.implementationId, adapterVersion: ADAPTER_VERSION },
        startedAt: finishedAt,
        finishedAt,
    };
    return { manifest: buildManifest(request, problem, result, plan, executionNonce), result };
}

function failedRecord(
    request: RunRequest,
    problem: ProblemSpec,
    reason: string,
    plan: RunRequest["measurementPlan"],
    executionNonce: string,
): RunRecord {
    const finishedAt = new Date().toISOString();
    const result: RunResult = {
        runId: "",
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "benchmark",
        status: "failed",
        cases: [],
        diagnostics: [reason],
        toolchain: { implementationId: request.implementationId, adapterVersion: ADAPTER_VERSION },
        startedAt: finishedAt,
        finishedAt,
    };
    return { manifest: buildManifest(request, problem, result, plan, executionNonce), result };
}
