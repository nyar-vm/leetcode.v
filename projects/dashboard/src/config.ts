/** 本地 Vite dev：可触发 /api/bench。生产构建（Cloudflare Pages）为纯静态快照。 */
export const isLocalDev = import.meta.env.DEV;

export const benchmarkDataUrl = import.meta.env.BASE_URL + "benchmark-results.json";
