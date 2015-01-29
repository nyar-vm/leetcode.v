import type { SolverAdapter } from "../domain/adapter.ts";
import { LANGUAGE_BENCH_PLUGINS } from "../adapters/plugins.ts";
import { runPythonSolver, hasPythonSolver, pythonRefReady } from "../adapters/python/ref.ts";
import { wrapBenchPlugin } from "./legacy-plugin-adapter.ts";
import type { ImplementationId } from "./ids.ts";
import type { ProblemSpec } from "../domain/problem.ts";
import type { RunResult } from "../domain/result.ts";
import { problemDir } from "../catalog/index.ts";
import { LEETCODE_ROOT } from "../domain/paths.ts";

async function pythonCorrectness(problem: ProblemSpec, problemRoot: string): Promise<RunResult> {
    const startedAt = new Date().toISOString();
    const def = { id: problem.id, title: problem.title };
    const ref = runPythonSolver(def);
    const finishedAt = new Date().toISOString();
    return {
        runId: "",
        problemId: problem.id,
        implementationId: "python",
        mode: "correctness",
        status: ref.ok ? "passed" : hasPythonSolver(problemRoot) ? "failed" : "blocked",
        blockedReason: ref.ok || hasPythonSolver(problemRoot) ? undefined : "solver not found",
        cases: problem.tests.map((test, index) => ({
            index,
            status: ref.ok ? "passed" : "failed",
            expected: test.expected,
        })),
        diagnostics: ref.ok ? [] : [ref.stderr],
        toolchain: { implementationId: "python", adapterVersion: "0.2.0" },
        startedAt,
        finishedAt,
    };
}

function buildRegistry(): Record<ImplementationId, SolverAdapter> {
    const python = wrapBenchPlugin("python", LANGUAGE_BENCH_PLUGINS.python, pythonCorrectness);
    const typescriptNode = wrapBenchPlugin("typescript-node", LANGUAGE_BENCH_PLUGINS.typescript);
    const typescriptBun = wrapBenchPlugin(
        "typescript-bun",
        LANGUAGE_BENCH_PLUGINS["typescript-bun"],
    );
    const valkyrieNode = wrapBenchPlugin("valkyrie-node", LANGUAGE_BENCH_PLUGINS.valkyrie);
    const wolframSxo = wrapBenchPlugin("wolfram-sxo", LANGUAGE_BENCH_PLUGINS["wolfram-sxo"]);
    const matlabSxo = wrapBenchPlugin("matlab-sxo", LANGUAGE_BENCH_PLUGINS["matlab-sxo"]);

    return {
        python,
        "typescript-node": typescriptNode,
        "typescript-bun": typescriptBun,
        "valkyrie-node": valkyrieNode,
        "wolfram-sxo": wolframSxo,
        "matlab-sxo": matlabSxo,
    };
}

const REGISTRY = buildRegistry();

export function getAdapter(implementationId: string): SolverAdapter {
    const adapter = REGISTRY[implementationId as ImplementationId];
    if (!adapter) {
        throw new Error(`未知适配器 ${implementationId}`);
    }
    return adapter;
}

export function allAdapters(): SolverAdapter[] {
    return Object.values(REGISTRY);
}

export function adapterReady(implementationId: ImplementationId): boolean {
    return getAdapter(implementationId).describeEnvironment().ready;
}

export function hasSolver(implementationId: ImplementationId, problemId: string): boolean {
    const problem = { id: problemId };
    const root = problemDir(LEETCODE_ROOT, problem);
    return getAdapter(implementationId).discover(root);
}

export { pythonRefReady };
