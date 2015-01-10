import { median } from "@valkyrie-language/vcc/benchmark";

import type { ProblemDefinition } from "../catalog.ts";
import {
    buildMatlabProgram,
    hasMatlabSxoSolver,
    loadSxoSolverBundle,
    problemRootFor,
    runSxoTests,
} from "./sxo-solver-shared.ts";
import { createMatlabEvaluator, sxoRunnerReady, sxoSkipReason } from "./sxo-bridge.ts";
import { parseMatlabSurface } from "./sxo-json.ts";

export { hasMatlabSxoSolver };

export async function runMatlabSxoSolverOnce(problemRoot: string): Promise<void> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, "matlab-sxo");
    const evaluator = await createMatlabEvaluator();
    runSxoTests(tests, (args) => {
        const program = buildMatlabProgram(source, symbol, args);
        const rendered = evaluator.evaluate(program);
        return parseMatlabSurface(rendered);
    });
}

export async function benchMatlabSxoSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
): Promise<number> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, "matlab-sxo");
    const evaluator = await createMatlabEvaluator();

    const runAll = () => {
        runSxoTests(tests, (args) => {
            const program = buildMatlabProgram(source, symbol, args);
            const rendered = evaluator.evaluate(program);
            return parseMatlabSurface(rendered);
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

export async function runMatlabSxoReference(
    problem: ProblemDefinition,
): Promise<{ ok: boolean; stderr: string }> {
    if (!sxoRunnerReady()) {
        return { ok: false, stderr: sxoSkipReason() ?? "@sxo/* 未安装" };
    }
    const root = problemRootFor(problem);
    if (!hasMatlabSxoSolver(root)) {
        return { ok: false, stderr: "missing ready solvers/matlab-sxo/solution.m" };
    }
    try {
        await runMatlabSxoSolverOnce(root);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
