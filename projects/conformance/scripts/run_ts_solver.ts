#!/usr/bin/env node
/** 加载 solvers/typescript/<project>/solution.ts 并执行 metadata.tests。 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { makeTsCandidate, normalizeTsTestResult } from "../src/runner/ts-ref.ts";

async function main(): Promise<number> {
    const problemDir = process.argv[2];
    if (!problemDir) {
        console.error("usage: run_ts_solver.ts <problem-dir>");
        return 2;
    }

    const meta = JSON.parse(readFileSync(join(problemDir, "metadata.json"), "utf8")) as {
        id?: string;
        tests?: { args: Record<string, unknown>; expected: unknown }[];
        invoke?: { typescript?: string };
    };
    const slug = meta.id;
    if (!slug) {
        throw new Error("metadata.id 缺失");
    }
    const tests = meta.tests;
    if (!tests?.length) {
        throw new Error("metadata.tests 为空");
    }
    const entry = meta.invoke?.typescript;
    if (!entry) {
        throw new Error("metadata.invoke.typescript 缺失");
    }

    const solutionFile = pathToFileURL(
        join(problemDir, "solvers", "typescript", "solution.ts"),
    ).href;
    const mod = (await import(solutionFile)) as Record<string, unknown>;
    const candidate = makeTsCandidate(entry, mod);

    for (const [index, case_] of tests.entries()) {
        const actual = normalizeTsTestResult(candidate(case_.args));
        const expected = normalizeTsTestResult(case_.expected);
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(
                `tests[${index}]: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
            );
        }
    }
    return 0;
}

main().catch((err) => {
    console.error(String(err));
    process.exit(1);
});
