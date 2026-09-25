import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import type { NativeHostSession } from '@sxo/core';

const requireFromHere = createRequire(import.meta.url);

export type SxoPackageStatus = {
    installed: boolean;
    mathematicaVersion: string | null;
    matlabVersion: string | null;
    skipReason: string | null;
};

function tryPackageVersion(name: string): string | null {
    try {
        const entry = requireFromHere.resolve(name);
        let dir = dirname(entry);
        for (let depth = 0; depth < 4; depth += 1) {
            try {
                const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as {
                    name?: string;
                    version?: string;
                };
                if (pkg.name === name && typeof pkg.version === 'string') {
                    return pkg.version;
                }
            } catch {
                // 继续向父目录查找 package.json
            }
            dir = dirname(dir);
        }
    } catch {
        return null;
    }
    return null;
}

export function sxoPackagesStatus(): SxoPackageStatus {
    const mathematicaVersion = tryPackageVersion('@sxo/mathematica');
    const matlabVersion = tryPackageVersion('@sxo/matlab');
    const installed = mathematicaVersion !== null && matlabVersion !== null;
    let skipReason: string | null = null;
    if (!installed) {
        const missing: string[] = [];
        if (!mathematicaVersion) {
            missing.push('@sxo/mathematica');
        }
        if (!matlabVersion) {
            missing.push('@sxo/matlab');
        }
        skipReason = `缺少 ${missing.join('、')}（在仓库根或 projects/conformance 运行 pnpm install）`;
    }
    return { installed, mathematicaVersion, matlabVersion, skipReason };
}

export function sxoRunnerReady(): boolean {
    return sxoPackagesStatus().installed;
}

export function sxoSkipReason(): string | null {
    return sxoPackagesStatus().skipReason;
}

export type SxoHarnessEvaluator = {
    evaluateDefinition(source: string): void;
    bindJson(name: string, value: unknown): void;
    invoke(symbol: string, argNames: string[]): unknown;
};

async function loadHostSession(dialect: 'mathematica' | 'matlab'): Promise<NativeHostSession> {
    const { loadNative } = await import('@sxo/core');
    const { HostSession } = loadNative();
    return new HostSession(dialect);
}

function harnessEvaluator(session: NativeHostSession): SxoHarnessEvaluator {
    return {
        evaluateDefinition(source: string): void {
            session.evaluateDefinition(source, { strategy: 'none' });
        },
        bindJson(name: string, value: unknown): void {
            session.bindJson(name, JSON.stringify(value));
        },
        invoke(symbol: string, argNames: string[]): unknown {
            const expr = session.invoke(symbol, argNames, { strategy: 'none' });
            const json = session.termToJson(expr);
            return JSON.parse(json) as unknown;
        },
    };
}

export async function createWolframHarnessEvaluator(): Promise<SxoHarnessEvaluator> {
    return harnessEvaluator(await loadHostSession('mathematica'));
}

export async function createMatlabHarnessEvaluator(): Promise<SxoHarnessEvaluator> {
    return harnessEvaluator(await loadHostSession('matlab'));
}
