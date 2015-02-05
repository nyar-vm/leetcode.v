import type { BenchLanguage } from "../reporting/schema.ts";

export const ALL_BENCH_LANGUAGES: BenchLanguage[] = ["python", "typescript", "typescript-bun", "valkyrie", "wolfram-sxo", "matlab-sxo"];

/** `LEETCODE_BENCH_LANG=all` 时的默认语言集（保持历史行为）。 */
export const DEFAULT_BENCH_LANGUAGES: BenchLanguage[] = ["python", "typescript", "valkyrie"];
