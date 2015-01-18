/**
 * 在 Bun 进程内执行（由 `run_bun_solver.ts` 调用）。
 * 复用 `solvers/typescript/solution.ts` 与 `metadata.invoke.typescript`。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { assertTestCase, makeTsCandidate, tsSolverPath } from "./ts-ref.ts";

type TestCase = { args: Record<string, unknown>; expected: unknown };

function median(values: number[]): number {
    if (!values.length) {
        throw new Error("median of empty array");
    }
    const sorted = [...values].sort((left, right) => left - right);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

function loadMetadata(problemRoot: string): { tests: TestCase[]; invoke: { typescript: string } } {
    const meta = JSON.parse(readFileSync(join(problemRoot, "metadata.json"), "utf8")) as {
        tests?: TestCase[];
        invoke?: { typescript?: string };
    };
    const tests = meta.tests;
    if (!tests?.length) {
        throw new Error("metadata.tests 为空");
    }
    const entry = meta.invoke?.typescript;
    if (!entry) {
        throw new Error("metadata.invoke.typescript 缺失");
    }
    return { tests, invoke: { typescript: entry } };
}

async function loadTsCandidate(problemRoot: string) {
    const { tests, invoke } = loadMetadata(problemRoot);
    const mod = (await import(pathToFileURL(tsSolverPath(problemRoot)).href)) as Record<
        string,
        unknown
    >;
    const candidate = makeTsCandidate(invoke.typescript, mod);
    return { tests, candidate };
}

export async function runBunSolverOnce(problemRoot: string): Promise<void> {
    const { tests, candidate } = await loadTsCandidate(problemRoot);
    for (const [index, case_] of tests.entries()) {
        assertTestCase(index, case_.expected, () => candidate(case_.args));
    }
}

export async function benchBunSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
): Promise<number> {
    const { tests, candidate } = await loadTsCandidate(problemRoot);

    const runAll = () => {
        for (const [index, case_] of tests.entries()) {
            assertTestCase(index, case_.expected, () => candidate(case_.args));
        }
    };

    for (let i = 0; i < warmup; i++) {
        runAll();
    }

    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        runAll();
        samples.push(performance.now() - start);
    }

    return median(samples);
}
