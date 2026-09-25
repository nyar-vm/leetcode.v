import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ProblemDefinition } from '../../catalog/index.ts';
import { problemDir } from '../../catalog/index.ts';
import { assertTestCase } from '../../domain/assert.ts';
import { loadProblemMetadata, requireInvoke, type TestCase } from '../../domain/metadata.ts';
import { LEETCODE_ROOT_FROM_PACKAGE } from '../../domain/paths.ts';
export type SxoDialect = 'wolfram-sxo' | 'matlab-sxo';

export type { TestCase };

const BLOCKED_MARKERS = ['# 阻塞：', '% 阻塞：'];

function isBlockedSource(text: string): boolean {
    const firstLine =
        text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .find((line) => line.length > 0) ?? '';
    return BLOCKED_MARKERS.some((marker) => firstLine.startsWith(marker));
}

export function wolframSxoSolverPath(problemRoot: string): string {
    return join(problemRoot, 'solvers', 'wolfram-sxo', 'solution.wl');
}

export function matlabSxoSolverPath(problemRoot: string): string {
    return join(problemRoot, 'solvers', 'matlab-sxo', 'solution.m');
}

export function hasWolframSxoSolver(problemRoot: string): boolean {
    try {
        const text = readFileSync(wolframSxoSolverPath(problemRoot), 'utf8');
        return text.trim().length > 0 && !isBlockedSource(text);
    } catch {
        return false;
    }
}

export function hasMatlabSxoSolver(problemRoot: string): boolean {
    try {
        const text = readFileSync(matlabSxoSolverPath(problemRoot), 'utf8');
        return text.trim().length > 0 && !isBlockedSource(text);
    } catch {
        return false;
    }
}

export function hasSxoSolver(problemRoot: string, dialect: SxoDialect): boolean {
    return dialect === 'wolfram-sxo' ? hasWolframSxoSolver(problemRoot) : hasMatlabSxoSolver(problemRoot);
}

function solverPath(problemRoot: string, dialect: SxoDialect): string {
    return dialect === 'wolfram-sxo' ? wolframSxoSolverPath(problemRoot) : matlabSxoSolverPath(problemRoot);
}

function invokeKey(dialect: SxoDialect): 'wolframSxo' | 'matlabSxo' {
    return dialect === 'wolfram-sxo' ? 'wolframSxo' : 'matlabSxo';
}

export function loadSxoSolverBundle(problemRoot: string, dialect: SxoDialect) {
    const metadata = loadProblemMetadata(problemRoot);
    const key = invokeKey(dialect);
    const symbol = requireInvoke(metadata, key);
    const source = readFileSync(solverPath(problemRoot, dialect), 'utf8');
    if (isBlockedSource(source)) {
        throw new Error(`${dialect} 解处于阻塞状态`);
    }
    return { tests: metadata.tests, symbol, source };
}

export function runSxoTests(tests: TestCase[], evaluateCase: (args: Record<string, unknown>) => unknown): void {
    for (const [index, case_] of tests.entries()) {
        assertTestCase(index, case_.expected, () => evaluateCase(case_.args));
    }
}

export function problemRootFor(problem: ProblemDefinition): string {
    return problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
}
