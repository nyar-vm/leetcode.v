/** 适配器注册 ID；与 dashboard 语言键分离，Node/Bun 为独立 runtime 身份。 */
export type ImplementationId = 'python' | 'typescript-node' | 'typescript-bun' | 'valkyrie-node' | 'wolfram-sxo' | 'matlab-sxo';

export const ALL_IMPLEMENTATION_IDS: ImplementationId[] = [
    'python',
    'typescript-node',
    'typescript-bun',
    'valkyrie-node',
    'wolfram-sxo',
    'matlab-sxo',
];

/** 历史 bench 语言键 → 适配器 ID。 */
export const BENCH_LANGUAGE_TO_IMPLEMENTATION: Record<string, ImplementationId> = {
    python: 'python',
    typescript: 'typescript-node',
    'typescript-bun': 'typescript-bun',
    valkyrie: 'valkyrie-node',
    'wolfram-sxo': 'wolfram-sxo',
    'matlab-sxo': 'matlab-sxo',
};

export const IMPLEMENTATION_TO_BENCH_LANGUAGE: Record<ImplementationId, string> = {
    python: 'python',
    'typescript-node': 'typescript',
    'typescript-bun': 'typescript-bun',
    'valkyrie-node': 'valkyrie',
    'wolfram-sxo': 'wolfram-sxo',
    'matlab-sxo': 'matlab-sxo',
};

export const DASHBOARD_BENCH_FILES: Record<ImplementationId, string> = {
    python: 'benchmark-python.json',
    'typescript-node': 'benchmark-typescript.json',
    'typescript-bun': 'benchmark-typescript-bun.json',
    'valkyrie-node': 'benchmark-valkyrie.json',
    'wolfram-sxo': 'benchmark-wolfram-sxo.json',
    'matlab-sxo': 'benchmark-matlab-sxo.json',
};
