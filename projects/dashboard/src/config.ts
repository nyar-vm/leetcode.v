const base = import.meta.env.BASE_URL;

export const benchmarkPythonUrl = `${base}benchmark-python.json`;
export const benchmarkTypeScriptUrl = `${base}benchmark-typescript.json`;
export const benchmarkTypeScriptBunUrl = `${base}benchmark-typescript-bun.json`;
export const benchmarkValkyrieUrl = `${base}benchmark-valkyrie.json`;
export const benchmarkWolframSxoUrl = `${base}benchmark-wolfram-sxo.json`;
export const benchmarkMatlabSxoUrl = `${base}benchmark-matlab-sxo.json`;

/** 旧版合并快照，仅作兼容回退。 */
export const benchmarkLegacyUrl = `${base}benchmark-results.json`;
