import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { NODE_WASM_TARGET, resolveArtifactDir, resolveNodeEntry } from "@valkyrie-language/vcc/testing";

import type { ProblemDefinition } from "../catalog.ts";
import { problemDir, valkyrieProjectDir } from "../catalog.ts";
import { LEETCODE_ROOT_FROM_PACKAGE } from "./paths.ts";
import { spawnLegion, valkyrieRunnerReady } from "./valkyrie.ts";

const RUN_V_SOLVER = join(
    LEETCODE_ROOT_FROM_PACKAGE,
    "projects",
    "conformance",
    "scripts",
    "run_v_solver.ts",
);

export type TestCase = { args: Record<string, unknown>; expected: unknown };

export function vBuildDir(problem: ProblemDefinition): string {
    return join(LEETCODE_ROOT_FROM_PACKAGE, ".cache", `${problem.id}-bench-node`);
}

export function resolveVBuildArtifacts(problem: ProblemDefinition) {
    const outDir = resolveArtifactDir(vBuildDir(problem), NODE_WASM_TARGET);
    const entry = resolveNodeEntry(outDir);
    if (!entry) {
        return null;
    }
    return { outDir, entry };
}

export function loadMetadata(problemRoot: string): {
    tests: TestCase[];
    invoke: { valkyrie?: string; typescript?: string };
} {
    const meta = JSON.parse(readFileSync(join(problemRoot, "metadata.json"), "utf8")) as {
        tests?: TestCase[];
        invoke?: { valkyrie?: string; typescript?: string };
    };
    const tests = meta.tests;
    if (!tests?.length) {
        throw new Error("metadata.tests 为空");
    }
    const entry = meta.invoke?.valkyrie ?? meta.invoke?.typescript;
    if (!entry) {
        throw new Error("metadata.invoke.valkyrie 或 invoke.typescript 缺失");
    }
    return { tests, invoke: { valkyrie: entry, typescript: meta.invoke?.typescript } };
}

/** 解析 wasm 导出符号列表（`legion spy wasm --list`）。 */
export function listWasmExports(wasmPath: string): string[] {
    const outcome = spawnLegion(["spy", "wasm", wasmPath, "--list"]);
    const text = `${outcome.stdout ?? ""}${outcome.stderr ?? ""}`;
    const exports: string[] = [];
    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*func\s+(\S+)\s*:/);
        if (match) {
            exports.push(match[1]);
        }
    }
    return exports;
}

/** 126 字节仅 `main` 的空壳 wasm（package 构建未编入题解）。 */
export function isStubWasmArtifact(wasmPath: string): boolean {
    try {
        const bytes = readFileSync(wasmPath);
        if (bytes.length > 512) {
            return false;
        }
        const exports = listWasmExports(wasmPath);
        return exports.length <= 1 && exports.every((name) => name === "main" || name === "_start");
    } catch {
        return true;
    }
}

export function wasmInvokeBlockedReason(wasmPath: string): string | null {
    if (!valkyrieRunnerReady()) {
        return "legion 未就绪";
    }
    if (isStubWasmArtifact(wasmPath)) {
        return (
            "wasm 仅为空壳 main（题解未编入可执行 MIR）。需上游：package 构建编译 entry solution.v、" +
            "导出 invoke 符号，并在 node glue 提供 callExport / JSON invoke（见 backlog V-017）"
        );
    }
    const exports = listWasmExports(wasmPath);
    if (exports.length <= 1) {
        return `wasm 缺少可 invoke 的导出符号（现有：${exports.join(", ") || "无"})`;
    }
    return null;
}

export async function runVSolverOnce(problemRoot: string): Promise<void> {
    const blocked = (() => {
        try {
            const metaPath = join(problemRoot, "metadata.json");
            const slug = JSON.parse(readFileSync(metaPath, "utf8")).id as string;
            const artifacts = resolveVBuildArtifacts({ id: slug } as ProblemDefinition);
            if (!artifacts) {
                return "未找到 legion build 产物（先跑 legion build --target node）";
            }
            return wasmInvokeBlockedReason(artifacts.entry.legionWasm);
        } catch (err) {
            return String(err);
        }
    })();
    if (blocked) {
        throw new Error(blocked);
    }

    const result = spawnSync(process.execPath, ["--import", "tsx", RUN_V_SOLVER, problemRoot], {
        encoding: "utf8",
        cwd: join(LEETCODE_ROOT_FROM_PACKAGE, "projects", "conformance"),
    });
    const stderr = `${result.stderr ?? ""}${result.stdout ?? ""}`.trim();
    if (result.status !== 0) {
        throw new Error(stderr || "run_v_solver failed");
    }
}

export async function runVReference(
    problem: ProblemDefinition,
): Promise<{ ok: boolean; stderr: string }> {
    const root = problemDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
    try {
        await runVSolverOnce(root);
        return { ok: true, stderr: "" };
    } catch (err) {
        return { ok: false, stderr: String(err) };
    }
}

export function valkyrieProjectPath(problem: ProblemDefinition): string {
    return valkyrieProjectDir(LEETCODE_ROOT_FROM_PACKAGE, problem);
}

export function vSolverModuleUrl(problemRoot: string): string {
    return pathToFileURL(join(problemRoot, "solvers", "valkyrie", "solution.v")).href;
}
