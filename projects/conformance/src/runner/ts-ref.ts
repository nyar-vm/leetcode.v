import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import type { ProblemDefinition } from "../catalog.ts";
import { problemDir } from "../catalog.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";

export function slugToTsProject(slug: string): string {
    let name = slug.replace(/-/g, "_");
    if (/^[0-9]/.test(name)) {
        name = `lc_${name}`;
    }
    return name;
}

export function tsSolverPath(problemRoot: string): string {
    return join(problemRoot, "solvers", "typescript", "solution.ts");
}

export function hasTsSolver(problemRoot: string, _problemId?: string): boolean {
    try {
        readFileSync(tsSolverPath(problemRoot), "utf8");
        return true;
    } catch {
        return false;
    }
}

type TestCase = { args: Record<string, unknown>; expected: unknown };

/** `void` 解返回 `undefined`；metadata 用 `null` 表示无返回值断言。 */
export function normalizeTsTestResult(value: unknown): unknown {
    return value === undefined ? null : value;
}

/** metadata 中 `expected: "Error: ..."` 表示应抛出异常且消息匹配。 */
export function assertTestCase(
    index: number,
    expected: unknown,
    run: () => unknown,
): void {
    if (typeof expected === "string" && expected.startsWith("Error:")) {
        try {
            run();
        } catch (err) {
            const actual =
                err instanceof Error ? `Error: ${err.message}` : `Error: ${String(err)}`;
            if (actual !== expected) {
                throw new Error(
                    `tests[${index}]: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
                );
            }
            return;
        }
        throw new Error(
            `tests[${index}]: expected ${JSON.stringify(expected)}, no exception raised`,
        );
    }
    const actual = normalizeTsTestResult(run());
    const normalized = normalizeTsTestResult(expected);
    if (JSON.stringify(actual) !== JSON.stringify(normalized)) {
        throw new Error(
            `tests[${index}]: expected ${JSON.stringify(normalized)}, got ${JSON.stringify(actual)}`,
        );
    }
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

/** 解析 `Solution().twoSum` 等 LeetCode 风格入口。 */
export function makeTsCandidate(
    entryPoint: string,
    mod: Record<string, unknown>,
): (args: Record<string, unknown>) => unknown {
    const expr = entryPoint.trim();
    const classMethod = expr.match(/^Solution\(\)\.(\w+)$/);
    if (classMethod) {
        const method = classMethod[1];
        const Solution = mod.Solution;
        if (typeof Solution !== "function") {
            throw new Error("solution.ts 缺少 export class Solution");
        }
        return (args) => {
            const instance = new (
                Solution as new () => Record<string, (...values: unknown[]) => unknown>
            )();
            const fn = instance[method];
            if (typeof fn !== "function") {
                throw new Error(`Solution 缺少方法 ${method}`);
            }
            return fn.call(instance, ...Object.values(args));
        };
    }
    const exported = mod[expr];
    if (typeof exported === "function") {
        return (args) => exported(...Object.values(args));
    }
    throw new Error(`无法解析 typescript entry: ${expr}`);
}

/** 跑一遍 metadata.tests。 */
export async function runTsSolverOnce(problemRoot: string, problemId: string): Promise<void> {
    const { tests, invoke } = loadMetadata(problemRoot);
    const mod = (await import(pathToFileURL(tsSolverPath(problemRoot)).href)) as Record<
        string,
        unknown
    >;
    const candidate = makeTsCandidate(invoke.typescript, mod);

    for (const [index, case_] of tests.entries()) {
        assertTestCase(index, case_.expected, () => candidate(case_.args));
    }
}

export async function runTsReference(
    problem: ProblemDefinition,
): Promise<{ ok: boolean; stderr: string }> {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    if (!hasTsSolver(root)) {
        return { ok: false, stderr: `missing ${tsSolverPath(root)}` };
    }
    try {
        await runTsSolverOnce(root, problem.id);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}
