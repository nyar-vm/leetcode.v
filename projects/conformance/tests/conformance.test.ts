import { mkdtempSync, rmSync } from "node:fs";

import { tmpdir } from "node:os";

import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { PROBLEMS, legionProjectDir, problemDir } from "../src/catalog/index.ts";
import { problemsForBatch } from "../src/planning/batch-limit.ts";

import { probeValkyrieProblem } from "../src/adapters/valkyrie-node/matrix.ts";

import {
    pythonRefReady,
    pythonSkipReason,
    runPythonSolver as runPythonReference,
} from "../src/adapters/python/ref.ts";

import { valkyrieRunnerReady } from "../src/adapters/valkyrie-node/valkyrie.ts";

const LEETCODE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const V_STRICT = process.env.LEETCODE_V_STRICT === "1";
const BATCH_PROBLEMS = problemsForBatch(PROBLEMS, { fallbackKeys: ["LEETCODE_TEST_LIMIT"] });

describe("Python 实现完备性（LeetCodeDataset）", () => {
    const ready = pythonRefReady();

    for (const problem of BATCH_PROBLEMS) {
        it.skipIf(!ready)(
            `${problem.id} canonical solution 通过数据集测试`,
            { timeout: 5 * 60 * 1000 },
            () => {
                const result = runPythonReference(problem);

                if (!result.ok) {
                    throw new Error(
                        result.stderr || pythonSkipReason() || "python reference failed",
                    );
                }

                expect(result.ok).toBe(true);
            },
        );
    }
});

describe("Valkyrie 完备性矩阵", () => {
    const ready = valkyrieRunnerReady();

    for (const problem of BATCH_PROBLEMS) {
        it.skipIf(!ready)(
            `${problem.id} legion build 必须通过`,
            { timeout: 10 * 60 * 1000 },
            () => {
                const projectPath = legionProjectDir(LEETCODE_ROOT, problem);

                const outDir = mkdtempSync(join(tmpdir(), `legion-matrix-${problem.id}-`));

                try {
                    const row = probeValkyrieProblem(problem, projectPath, outDir);

                    expect(row.buildStatus, row.buildError ?? "build failed").toBe(0);

                    if (V_STRICT) {
                        expect(row.testStatus, row.testError ?? "test failed").toBe(0);
                    }
                } finally {
                    rmSync(outDir, { recursive: true, force: true });
                }
            },
        );
    }
});
