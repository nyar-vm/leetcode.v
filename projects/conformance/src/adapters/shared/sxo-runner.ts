import { median } from '@valkyrie-language/vcc/benchmark';

import { createMatlabHarnessEvaluator, createWolframHarnessEvaluator, type SxoHarnessEvaluator } from './sxo-bridge.ts';
import { loadSxoSolverBundle, type SxoDialect } from './sxo-solver-shared.ts';

export type SxoDialectRunner = {
    dialect: SxoDialect;
    createEvaluator: () => Promise<SxoHarnessEvaluator>;
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

function runHarnessInvoke(evaluator: SxoHarnessEvaluator, symbol: string, args: Record<string, unknown>): unknown {
    const argNames = Object.keys(args);
    for (const name of argNames) {
        evaluator.bindJson(name, args[name]);
    }
    return evaluator.invoke(symbol, argNames);
}

function runHarnessCase(
    evaluator: SxoHarnessEvaluator,
    source: string,
    symbol: string,
    args: Record<string, unknown>,
): unknown {
    evaluator.evaluateDefinition(source);
    return runHarnessInvoke(evaluator, symbol, args);
}

async function runAllTests(
    runner: SxoDialectRunner,
    source: string,
    symbol: string,
    tests: { args: Record<string, unknown>; expected: unknown }[],
    assert: boolean,
): Promise<void> {
    const evaluator = await runner.createEvaluator();
    evaluator.evaluateDefinition(source);
    for (const [index, case_] of tests.entries()) {
        const actual = runHarnessInvoke(evaluator, symbol, case_.args);
        if (assert) {
            assertSxoTestCase(index, case_.expected, case_.args, actual);
        }
    }
}

export async function runSxoSolverOnce(problemRoot: string, runner: SxoDialectRunner): Promise<void> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);
    await runAllTests(runner, source, symbol, tests, true);
}

export async function benchSxoSolverInProcess(
    problemRoot: string,
    iterations: number,
    warmup: number,
    runner: SxoDialectRunner,
): Promise<number> {
    const { tests, symbol, source } = loadSxoSolverBundle(problemRoot, runner.dialect);

    const runAll = async () => {
        await runAllTests(runner, source, symbol, tests, true);
    };

    for (let i = 0; i < warmup; i++) {
        await runAll();
        if (warmup > 1) {
            console.error(`[sxo-bench] warmup ${i + 1}/${warmup}`);
        }
    }

    const samples: number[] = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await runAll();
        samples.push(performance.now() - start);
        console.error(`[sxo-bench] sample ${i + 1}/${iterations} ${samples.at(-1)!.toFixed(0)}ms`);
    }

    return median(samples);
}

export const WOLFRAM_SXO_RUNNER: SxoDialectRunner = {
    dialect: 'wolfram-sxo',
    createEvaluator: createWolframHarnessEvaluator,
};

export const MATLAB_SXO_RUNNER: SxoDialectRunner = {
    dialect: 'matlab-sxo',
    createEvaluator: createMatlabHarnessEvaluator,
};
