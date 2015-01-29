/**
 * 在 Bun 进程内执行（由 `run_bun_solver.ts` 调用）。
 * 复用 `solvers/typescript/solution.ts` 与 `metadata.invoke.typescript`。
 */
import { pathToFileURL } from "node:url";

import { assertTestCase } from "../../domain/assert.ts";
import { loadProblemMetadata, requireInvoke } from "../../domain/metadata.ts";
import { makeTsCandidate, tsSolverPath } from "./ref.ts";

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

async function loadTsCandidate(problemRoot: string) {
    const metadata = loadProblemMetadata(problemRoot);
    const entry = requireInvoke(metadata, "typescript");
    const mod = (await import(pathToFileURL(tsSolverPath(problemRoot)).href)) as Record<
        string,
        unknown
    >;
    const candidate = makeTsCandidate(entry, mod);
    return { tests: metadata.tests, candidate };
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
