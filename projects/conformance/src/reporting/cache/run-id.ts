import { createHash } from "node:crypto";

export type RunIdInputs = {
    problemId: string;
    implementationId: string;
    mode: "correctness" | "benchmark";
    sourceDigest: string;
    adapterVersion: string;
    toolchainKey: string;
    measurementPlanKey: string;
    executionNonce: string;
};

/** 与 benchmark/correctness manifest 一致的题目源码摘要。 */
export function problemSourceDigest(problemId: string, implementationId: string, tests: unknown[]): string {
    return digestSource([problemId, implementationId, JSON.stringify(tests)]);
}

export function digestSource(parts: string[]): string {
    const hash = createHash("sha256");
    for (const part of parts) {
        hash.update(part);
        hash.update("\0");
    }
    return hash.digest("hex").slice(0, 16);
}

export function buildRunId(inputs: RunIdInputs): string {
    const hash = createHash("sha256");
    const payload = [
        inputs.problemId,
        inputs.implementationId,
        inputs.mode,
        inputs.sourceDigest,
        inputs.adapterVersion,
        inputs.toolchainKey,
        inputs.measurementPlanKey,
        inputs.executionNonce,
    ].join("|");
    hash.update(payload);
    return hash.digest("hex").slice(0, 20);
}
