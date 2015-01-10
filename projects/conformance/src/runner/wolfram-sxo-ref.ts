import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../catalog.ts";
import {
    buildWolframProgram,
    hasWolframSxoSolver,
    loadSxoSolverBundle,
    problemRootFor,
    runSxoTests,
} from "./sxo-solver-shared.ts";
import { createWolframEvaluator, sxoRunnerReady, sxoSkipReason } from "./sxo-bridge.ts";
import { parseWolframSurface } from "./sxo-json.ts";

export { hasWolframSxoSolver };

export async function runWolframSxoSolverOnce(problemRoot: string): Promise<void> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, "wolfram-sxo");
    const evaluator = await createWolframEvaluator();
    runSxoTests(tests, (args) => {
        const program = buildWolframProgram(source, symbol, args);
        const rendered = evaluator.evaluate(program);
        return parseWolframSurface(rendered);
    });
}

export async function benchWolframSxoSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
): Promise<number> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, "wolfram-sxo");
    const evaluator = await createWolframEvaluator();

    const runAll = () => {
        runSxoTests(tests, (args) => {
            const program = buildWolframProgram(source, symbol, args);
            const rendered = evaluator.evaluate(program);
            return parseWolframSurface(rendered);
        });
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

export async function runWolframSxoReference(
    problem: ProblemDefinition,
): Promise<{ ok: boolean; stderr: string }> {
    if (!sxoRunnerReady()) {
        return { ok: false, stderr: sxoSkipReason() ?? "@sxo/* 未安装" };
    }
    const root = problemRootFor(problem);
    if (!hasWolframSxoSolver(root)) {
        return { ok: false, stderr: "missing ready solvers/wolfram-sxo/solution.wl" };
    }
    try {
        await runWolframSxoSolverOnce(root);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
