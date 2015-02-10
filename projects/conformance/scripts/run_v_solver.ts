#!/usr/bin/env node
/** 加载 legion node 产物并对 metadata.tests 执行外部 wasm invoke（待 glue 接线）。 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { assertTestCase, normalizeTsTestResult } from '../src/domain/assert.ts';
import { loadMetadata, resolveVBuildArtifacts, resolveWasmExportSymbol, wasmInvokeBlockedReason } from '../src/adapters/valkyrie-node/ref.ts';

type InvokeHost = {
    invokeLeetCode?: (entry: string, args: Record<string, unknown>) => unknown;
    callExport?: (name: string, ...args: unknown[]) => unknown;
};

async function loadInvokeHost(mjsPath: string): Promise<InvokeHost> {
    const href = new URL(mjsPath, 'file:///').href;
    return (await import(href)) as InvokeHost;
}

async function runCandidate(host: InvokeHost, entry: string, args: Record<string, unknown>): Promise<unknown> {
    if (typeof host.invokeLeetCode === 'function') {
        return host.invokeLeetCode(entry, args);
    }
    if (typeof host.callExport === 'function') {
        const exportSymbol = resolveWasmExportSymbol(entry);
        return host.callExport(exportSymbol, ...Object.values(args));
    }
    throw new Error('node glue 缺少 invokeLeetCode / callExport（需 valkyrie.rs 为 leetcode 库模式接线 wasm invoke）');
}

async function main(): Promise<number> {
    const problemDir = process.argv[2];
    if (!problemDir) {
        console.error('usage: run_v_solver.ts <problem-dir>');
        return 2;
    }

    const meta = JSON.parse(readFileSync(join(problemDir, 'metadata.json'), 'utf8')) as {
        id?: string;
    };
    const slug = meta.id;
    if (!slug) {
        throw new Error('metadata.id 缺失');
    }

    const artifacts = resolveVBuildArtifacts({ id: slug });
    if (!artifacts) {
        throw new Error('未找到 legion build 产物');
    }

    const { tests, invoke } = loadMetadata(problemDir);
    const entry = invoke.valkyrie ?? invoke.typescript;
    const blocked = wasmInvokeBlockedReason(artifacts.entry.legionWasm, entry);
    if (blocked) {
        throw new Error(blocked);
    }
    if (!entry) {
        throw new Error('metadata.invoke 缺失');
    }

    const host = await loadInvokeHost(artifacts.entry.legionMjs);
    for (const [index, case_] of tests.entries()) {
        if (typeof case_.expected === 'string' && case_.expected.startsWith('Error:')) {
            assertTestCase(index, case_.expected, () => {
                void runCandidate(host, entry, case_.args);
            });
            continue;
        }
        const actual = normalizeTsTestResult(await runCandidate(host, entry, case_.args));
        const expected = normalizeTsTestResult(case_.expected);
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`tests[${index}]: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    }
    return 0;
}

main().catch((err) => {
    console.error(String(err));
    process.exit(1);
});
