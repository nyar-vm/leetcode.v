import type { RunRequest } from "../domain/run.ts";
import type { RunResult } from "../domain/result.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import { LEETCODE_ROOT } from "../domain/paths.ts";
import { problemDir } from "../catalog/index.ts";
import { getAdapter } from "../adapters/registry.ts";
import { buildRunId, digestSource } from "../reporting/cache/run-id.ts";
import { writeRunRecord } from "../reporting/cache/store.ts";
import type { RunRecord } from "../reporting/cache/types.ts";

const ADAPTER_VERSION = "0.2.0";

export async function runCorrectness(
    request: RunRequest,
    problem: ProblemSpec,
    executionNonce: string,
): Promise<RunRecord> {
    const adapter = getAdapter(request.implementationId);
    const problemRoot = problemDir(LEETCODE_ROOT, problem);
    const env = adapter.describeEnvironment();

    if (!env.ready) {
        const finishedAt = new Date().toISOString();
        const result: RunResult = {
            runId: "",
            problemId: problem.id,
            implementationId: request.implementationId,
            mode: "correctness",
            status: "blocked",
            blockedReason: env.blockedReason ?? "adapter not ready",
            cases: [],
            diagnostics: [],
            toolchain: {
                implementationId: request.implementationId,
                adapterVersion: ADAPTER_VERSION,
            },
            startedAt: finishedAt,
            finishedAt,
        };
        return { manifest: buildManifest(request, problem, result, executionNonce), result };
    }

    if (!adapter.discover(problemRoot)) {
        const finishedAt = new Date().toISOString();
        const result: RunResult = {
            runId: "",
            problemId: problem.id,
            implementationId: request.implementationId,
            mode: "correctness",
            status: "blocked",
            blockedReason: "solver not found",
            cases: [],
            diagnostics: [],
            toolchain: {
                implementationId: request.implementationId,
                adapterVersion: ADAPTER_VERSION,
            },
            startedAt: finishedAt,
            finishedAt,
        };
        return { manifest: buildManifest(request, problem, result, executionNonce), result };
    }

    const prepare = await adapter.prepare(problem, problemRoot);
    if (!prepare.ok) {
        const finishedAt = new Date().toISOString();
        const result: RunResult = {
            runId: "",
            problemId: problem.id,
            implementationId: request.implementationId,
            mode: "correctness",
            status: "failed",
            cases: [],
            diagnostics: [prepare.error ?? "prepare failed"],
            toolchain: {
                implementationId: request.implementationId,
                adapterVersion: ADAPTER_VERSION,
            },
            startedAt: finishedAt,
            finishedAt,
        };
        return { manifest: buildManifest(request, problem, result, executionNonce), result };
    }

    const result = await adapter.invokeCorrectness(problem, problemRoot);
    const record: RunRecord = {
        manifest: buildManifest(request, problem, result, executionNonce),
        result: { ...result, runId: "" },
    };
    record.manifest.runId = buildRunId({
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "correctness",
        sourceDigest: record.manifest.sourceDigest,
        adapterVersion: ADAPTER_VERSION,
        toolchainKey: JSON.stringify(env.details),
        measurementPlanKey: "",
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
        mode: "correctness",
        createdAt: result.finishedAt,
        sourceDigest,
        adapterVersion: ADAPTER_VERSION,
        toolchain: result.toolchain as unknown as Record<string, unknown>,
        profile: request.profile,
    };
}
