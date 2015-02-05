import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { RunRecord } from "../src/reporting/cache/types.ts";

describe("cache store", () => {
    let tempRoot: string;

    beforeEach(() => {
        tempRoot = mkdtempSync(join(tmpdir(), "conformance-cache-"));
        vi.resetModules();
        vi.doMock("../src/domain/paths.ts", () => ({
            CONFORMANCE_CACHE_ROOT: join(tempRoot, "conformance"),
            LEETCODE_ROOT: tempRoot,
            CONFORMANCE_ROOT: join(tempRoot, "conformance-pkg"),
            BENCH_PUBLIC_DIR: join(tempRoot, "dashboard", "public"),
        }));
    });

    afterEach(() => {
        rmSync(tempRoot, { recursive: true, force: true });
        vi.restoreAllMocks();
    });

    it("writes run record and preserves history on partial rerun", async () => {
        const { writeRunRecord, readRunRecord, readIndex } = await import("../src/reporting/cache/store.ts");

        const base: RunRecord = {
            manifest: {
                runId: "run-a",
                problemId: "two-sum",
                implementationId: "python",
                mode: "benchmark",
                createdAt: new Date().toISOString(),
                sourceDigest: "digest-a",
                adapterVersion: "0.2.0",
                toolchain: {},
            },
            result: {
                runId: "run-a",
                problemId: "two-sum",
                implementationId: "python",
                mode: "benchmark",
                status: "passed",
                cases: [],
                diagnostics: [],
                toolchain: { implementationId: "python", adapterVersion: "0.2.0" },
                startedAt: new Date().toISOString(),
                finishedAt: new Date().toISOString(),
            },
        };

        writeRunRecord(base);
        const second: RunRecord = {
            ...base,
            manifest: { ...base.manifest, runId: "run-b", sourceDigest: "digest-b" },
            result: { ...base.result, runId: "run-b" },
        };
        writeRunRecord(second);

        expect(readRunRecord("run-a")).not.toBeNull();
        expect(readRunRecord("run-b")).not.toBeNull();
        const index = readIndex();
        expect(index.entries["two-sum:python:benchmark"].runId).toBe("run-b");
        expect(index.entries["two-sum:python:benchmark"].current).toBe(true);
    });
});
