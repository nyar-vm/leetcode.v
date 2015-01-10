import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { assertTestCase } from "./ts-ref.ts";
import { jsonToMatlab, jsonToWolfram } from "./sxo-json.ts";

export type SxoDialect = "wolfram-sxo" | "matlab-sxo";

export type TestCase = { args: Record<string, unknown>; expected: unknown };

const BLOCKED_MARKERS = ["# 阻塞：", "% 阻塞："];

function isBlockedSource(text: string): boolean {
    const firstLine =
        text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .find((line) => line.length > 0) ?? "";
    return BLOCKED_MARKERS.some((marker) => firstLine.startsWith(marker));
}

export function wolframSxoSolverPath(problemRoot: string): string {
    return join(problemRoot, "solvers", "wolfram-sxo", "solution.wl");
}

export function matlabSxoSolverPath(problemRoot: string): string {
    return join(problemRoot, "solvers", "matlab-sxo", "solution.m");
}

export function hasWolframSxoSolver(problemRoot: string): boolean {
    try {
        const text = readFileSync(wolframSxoSolverPath(problemRoot), "utf8");
        return text.trim().length > 0 && !isBlockedSource(text);
    } catch {
        return false;
    }
}

export function hasMatlabSxoSolver(problemRoot: string): boolean {
    try {
        const text = readFileSync(matlabSxoSolverPath(problemRoot), "utf8");
        return text.trim().length > 0 && !isBlockedSource(text);
    } catch {
        return false;
    }
}

export function hasSxoSolver(problemRoot: string, dialect: SxoDialect): boolean {
    return dialect === "wolfram-sxo" ? hasWolframSxoSolver(problemRoot) : hasMatlabSxoSolver(problemRoot);
}

function solverPath(problemRoot: string, dialect: SxoDialect): string {
    return dialect === "wolfram-sxo" ? wolframSxoSolverPath(problemRoot) : matlabSxoSolverPath(problemRoot);
}

function invokeKey(dialect: SxoDialect): "wolframSxo" | "matlabSxo" {
    return dialect === "wolfram-sxo" ? "wolframSxo" : "matlabSxo";
}

export function loadSxoSolverBundle(problemRoot: string, dialect: SxoDialect) {
    const meta = JSON.parse(readFileSync(join(problemRoot, "metadata.json"), "utf8")) as {
        tests?: TestCase[];
        invoke?: { wolframSxo?: string; matlabSxo?: string };
    };
    const tests = meta.tests;
    if (!tests?.length) {
        throw new Error("metadata.tests 为空");
    }
    const key = invokeKey(dialect);
    const symbol = meta.invoke?.[key]?.trim();
    if (!symbol) {
        throw new Error(`metadata.invoke.${key} 缺失`);
    }
    const source = readFileSync(solverPath(problemRoot, dialect), "utf8");
    if (isBlockedSource(source)) {
        throw new Error(`${dialect} 解处于阻塞状态`);
    }
    return { tests, symbol, source };
}

export function buildWolframProgram(source: string, symbol: string, args: Record<string, unknown>): string {
    const argList = Object.values(args).map((value) => jsonToWolfram(value)).join(", ");
    return `${source.trim()}\n\n${symbol}[${argList}]`;
}

export function buildMatlabProgram(source: string, symbol: string, args: Record<string, unknown>): string {
    const argList = Object.values(args).map((value) => jsonToMatlab(value)).join(", ");
    return `${source.trim()}\n\n${symbol}(${argList})`;
}

export function runSxoTests(
    tests: TestCase[],
    evaluateCase: (args: Record<string, unknown>) => unknown,
): void {
    for (const [index, case_] of tests.entries()) {
        assertTestCase(index, case_.expected, () => evaluateCase(case_.args));
    }
}

export function problemRootFor(problem: ProblemDefinition): string {
    return problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
}
