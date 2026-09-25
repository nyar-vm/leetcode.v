import { median } from '@valkyrie-language/vcc/benchmark';

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

function isTwoSumArgs(args: Record<string, unknown>): args is { nums: number[]; target: number } {
    return Array.isArray(args.nums) && typeof args.target === 'number';
}

function isIndexPair(value: unknown): value is [number, number] {
    return (
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number'
    );
}

function assertTwoSumCase(
    index: number,
    args: { nums: number[]; target: number },
    expected: unknown,
    actual: unknown,
): void {
    if (expected === null) {
        if (actual !== null && !(Array.isArray(actual) && actual.length === 0)) {
            throw new Error(`tests[${index}]: expected no solution, got ${JSON.stringify(actual)}`);
        }
        return;
    }
    if (actual === null || (Array.isArray(actual) && actual.length === 0)) {
        throw new Error(`tests[${index}]: expected a two-sum index pair, got ${JSON.stringify(actual)}`);
    }
    if (!isIndexPair(actual)) {
        throw new Error(`tests[${index}]: expected a two-sum index pair or empty result, got ${JSON.stringify(actual)}`);
    }
    const [i, j] = actual;
    if (i === j || i < 0 || j < 0 || i >= args.nums.length || j >= args.nums.length) {
        throw new Error(`tests[${index}]: invalid index pair ${JSON.stringify(actual)}`);
    }
    if (args.nums[i] + args.nums[j] !== args.target) {
        throw new Error(
            `tests[${index}]: indices ${JSON.stringify(actual)} do not sum to target ${args.target} (got ${args.nums[i] + args.nums[j]})`,
        );
    }
}

function assertSxoTestCase(index: number, expected: unknown, args: Record<string, unknown>, actual: unknown): void {
    if (isTwoSumArgs(args) && (expected === null || isIndexPair(expected))) {
        assertTwoSumCase(index, args, expected, actual);
        return;
    }
    if (JSON.stringify(actual) !== JSON.stringify(expected === undefined ? null : expected)) {
        throw new Error(`tests[${index}]: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}


export async function runSxoSolverOnce(problemRoot: string, runner: SxoDialectRunner): Promise<void> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);
    for (const [index, case_] of tests.entries()) {
        const evaluator = await runner.createEvaluator();
        const program = runner.buildProgram(source, symbol, case_.args);
        const rendered = evaluator.evaluate(program);
        const actual = runner.parseSurface(rendered);
        assertSxoTestCase(index, case_.expected, case_.args, actual);
    }
}

export async function benchSxoSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
    runner: SxoDialectRunner,
): Promise<number> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);

    const runAll = async () => {
        for (const [index, case_] of tests.entries()) {
            const evaluator = await runner.createEvaluator();
            const program = runner.buildProgram(source, symbol, case_.args);
            const rendered = evaluator.evaluate(program);
            const actual = runner.parseSurface(rendered);
            assertSxoTestCase(index, case_.expected, case_.args, actual);
        }
    };

    for (let i = 0; i < warmup; i++) {
        await runAll();
    }

    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await runAll();
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
