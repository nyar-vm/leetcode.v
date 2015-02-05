import type { RunRequest } from "../domain/run.ts";
import type { RunResult } from "../domain/result.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import type { AdapterEnvironment } from "../domain/adapter.ts";
import { LEETCODE_ROOT } from "../domain/paths.ts";
import { problemDir } from "../catalog/index.ts";
import { getAdapter } from "../adapters/registry.ts";
import { buildRunId, problemSourceDigest } from "../reporting/cache/run-id.ts";
import { writeRunRecord } from "../reporting/cache/store.ts";
import type { RunRecord } from "../reporting/cache/types.ts";

const ADAPTER_VERSION = "0.2.0";

export async function runCorrectness(request: RunRequest, problem: ProblemSpec, executionNonce: string): Promise<RunRecord> {
    const adapter = await getAdapter(request.implementationId);
    const problemRoot = problemDir(LEETCODE_ROOT, problem);
    const env = adapter.describeEnvironment();

    if (!env.ready) {
        return persistRecord(
            statusRecord(request, problem, "blocked", env.blockedReason ?? "adapter not ready", [], executionNonce),
            env,
            executionNonce,
        );
    }

    if (!adapter.discover(problemRoot)) {
        return persistRecord(statusRecord(request, problem, "blocked", "solver not found", [], executionNonce), env, executionNonce);
    }

    const prepare = await adapter.prepare(problem, problemRoot);
    if (!prepare.ok) {
        return persistRecord(
            statusRecord(request, problem, "failed", undefined, [prepare.error ?? "prepare failed"], executionNonce),
            env,
            executionNonce,
        );
    }

    const result = await adapter.invokeCorrectness(problem, problemRoot);
    return persistRecord(
        {
            manifest: buildManifest(request, problem, result, executionNonce),
            result: { ...result, runId: "" },
        },
        env,
        executionNonce,
    );
}

function persistRecord(record: RunRecord, env: AdapterEnvironment, executionNonce: string): RunRecord {
    record.manifest.runId = buildRunId({
        problemId: record.manifest.problemId,
        implementationId: record.manifest.implementationId,
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

function statusRecord(
    request: RunRequest,
    problem: ProblemSpec,
    status: RunResult["status"],
    blockedReason: string | undefined,
    diagnostics: string[],
    executionNonce: string,
): RunRecord {
    const finishedAt = new Date().toISOString();
    const result: RunResult = {
        runId: "",
        problemId: problem.id,
        implementationId: request.implementationId,
        mode: "correctness",
        status,
        blockedReason,
        cases: [],
        diagnostics,
        toolchain: {
            implementationId: request.implementationId,
            adapterVersion: ADAPTER_VERSION,
        },
        startedAt: finishedAt,
        finishedAt,
    };
    return { manifest: buildManifest(request, problem, result, executionNonce), result };
}

function buildManifest(request: RunRequest, problem: ProblemSpec, result: RunResult, executionNonce: string): RunRecord["manifest"] {
    const sourceDigest = problemSourceDigest(problem.id, request.implementationId, problem.tests);
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
