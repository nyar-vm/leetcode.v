import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

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

export type WolframEvaluator = {
    evaluate(program: string): string;
};

export type MatlabEvaluator = {
    evaluate(program: string): string;
};

export async function createWolframEvaluator(): Promise<WolframEvaluator> {
    const mod = (await import('@sxo/mathematica')) as {
        Mathematica: {
            create: (options?: { autoSimplify?: boolean }) => {
                evaluate: (input: string) => { toWolfram: () => string };
            };
        };
    };
    const frontend = mod.Mathematica.create({ autoSimplify: false });
    return {
        evaluate(program: string): string {
            return frontend.evaluate(program).toWolfram();
        },
    };
}

export async function createMatlabEvaluator(): Promise<MatlabEvaluator> {
    const mod = (await import('@sxo/matlab')) as {
        Matlab: {
            create: (options?: { autoSimplify?: boolean }) => {
                evaluate: (input: string) => { toMatlab: () => string };
            };
        };
    };
    const frontend = mod.Matlab.create({ autoSimplify: false });
    return {
        evaluate(program: string): string {
            return frontend.evaluate(program).toMatlab();
        },
    };
}
