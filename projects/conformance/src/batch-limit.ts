/** 与 `scripts/batch-limit.mjs` 对齐：测试/基准默认只跑前 N 题。 */

export const DEFAULT_BATCH_LIMIT = 50;

const ALL_TOKENS = new Set(["all", "0", "infinity", "inf", "*"]);

function firstEnv(...keys: string[]): { key: string; value: string } | null {
    for (const key of keys) {
        const value = process.env[key];
        if (value !== undefined && value !== "") {
            return { key, value };
        }
    }
    return null;
}

/** `null` = 不限制（全量）。 */
export function parseBatchLimit(
    options: { defaultLimit?: number; fallbackKeys?: string[] } = {},
): number | null {
    const { defaultLimit = DEFAULT_BATCH_LIMIT, fallbackKeys = [] } = options;

    if (process.env.LEETCODE_BATCH_ALL === "1" || process.env.LEETCODE_BATCH_ALL === "true") {
        return null;
    }

    const hit = firstEnv("LEETCODE_BATCH_LIMIT", ...fallbackKeys);
    if (!hit) {
        return defaultLimit;
    }

    const normalized = hit.value.trim().toLowerCase();
    if (ALL_TOKENS.has(normalized)) {
        return null;
    }

    const parsed = Number(hit.value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`无效的批量限制 ${hit.key}=${hit.value}`);
    }
    if (parsed === 0) {
        return null;
    }
    return Math.floor(parsed);
}

export function problemsForBatch<T>(
    problems: readonly T[],
    options?: { defaultLimit?: number; fallbackKeys?: string[] },
): T[] {
    const limit = parseBatchLimit(options);
    if (limit === null) {
        return [...problems];
    }
    return problems.slice(0, limit);
}
