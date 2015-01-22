import { readFileSync } from "node:fs";
import { join } from "node:path";

export type TestCase = { args: Record<string, unknown>; expected: unknown };

export type ProblemMetadata = {
    tests: TestCase[];
    invoke: Record<string, string | undefined>;
};

export function loadProblemMetadata(problemRoot: string): ProblemMetadata {
    const meta = JSON.parse(readFileSync(join(problemRoot, "metadata.json"), "utf8")) as {
        tests?: TestCase[];
        invoke?: Record<string, string | undefined>;
    };
    const tests = meta.tests;
    if (!tests?.length) {
        throw new Error("metadata.tests 为空");
    }
    return { tests, invoke: meta.invoke ?? {} };
}

export function requireInvoke(metadata: ProblemMetadata, key: string): string {
    const value = metadata.invoke[key]?.trim();
    if (!value) {
        throw new Error(`metadata.invoke.${key} 缺失`);
    }
    return value;
}
