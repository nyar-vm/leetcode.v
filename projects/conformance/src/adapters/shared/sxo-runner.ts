import { median } from '@valkyrie-language/vcc/benchmark';

import { assertTestCase } from '../../domain/assert.ts';
import type { TestCase } from '../../domain/metadata.ts';
import { createMatlabEvaluator, createWolframEvaluator } from './sxo-bridge.ts';
import { parseMatlabSurface, parseWolframSurface } from './sxo-json.ts';
import { buildMatlabProgram, buildWolframProgram, loadSxoSolverBundle, type SxoDialect } from './sxo-solver-shared.ts';

export type SxoEvaluator = {
    evaluate(program: string): string;
};

export type SxoDialectRunner = {
    dialect: SxoDialect;
    createEvaluator: () => Promise<SxoEvaluator>;
    buildProgram: (source: string, symbol: string, args: Record<string, unknown>) => string;
    parseSurface: (rendered: string) => unknown;
};

function runSxoTests(tests: TestCase[], evaluateCase: (args: Record<string, unknown>) => unknown): void {
    for (const [index, case_] of tests.entries()) {
        assertTestCase(index, case_.expected, () => evaluateCase(case_.args));
    }
}

export async function runSxoSolverOnce(problemRoot: string, runner: SxoDialectRunner): Promise<void> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);
    const evaluator = await runner.createEvaluator();
    runSxoTests(tests, (args) => {
        const program = runner.buildProgram(source, symbol, args);
        const rendered = evaluator.evaluate(program);
        return runner.parseSurface(rendered);
    });
}

export async function benchSxoSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
    runner: SxoDialectRunner,
): Promise<number> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);
    const evaluator = await runner.createEvaluator();

    const runAll = () => {
        runSxoTests(tests, (args) => {
            const program = runner.buildProgram(source, symbol, args);
            const rendered = evaluator.evaluate(program);
            return runner.parseSurface(rendered);
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

export const WOLFRAM_SXO_RUNNER: SxoDialectRunner = {
    dialect: 'wolfram-sxo',
    createEvaluator: createWolframEvaluator,
    buildProgram: buildWolframProgram,
    parseSurface: parseWolframSurface,
};

export const MATLAB_SXO_RUNNER: SxoDialectRunner = {
    dialect: 'matlab-sxo',
    createEvaluator: createMatlabEvaluator,
    buildProgram: buildMatlabProgram,
    parseSurface: parseMatlabSurface,
};
