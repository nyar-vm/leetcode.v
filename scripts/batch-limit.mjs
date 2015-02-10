/**
 * 批量脚本默认限流（几万题规模下避免误触全量 IO）。
 *
 * 默认：50 题。
 * 全量：LEETCODE_BATCH_ALL=1  或  LEETCODE_BATCH_LIMIT=all|0
 * 指定：LEETCODE_BATCH_LIMIT=200
 *
 * 兼容别名：LCD_IMPORT_LIMIT / REGENERATE_LIMIT / LEETCODE_TEST_LIMIT / LEETCODE_BENCH_LIMIT
 */

export const DEFAULT_BATCH_LIMIT = 50;

const ALL_TOKENS = new Set(['all', '0', 'infinity', 'inf', '*']);

function firstEnv(...keys) {
    for (const key of keys) {
        const value = process.env[key];
        if (value !== undefined && value !== '') {
            return { key, value };
        }
    }
    return null;
}

/** @returns {number | null} `null` 表示不限制（全量）。 */
export function parseBatchLimit(options = {}) {
    const { defaultLimit = DEFAULT_BATCH_LIMIT, fallbackKeys = [] } = options;

    if (process.env.LEETCODE_BATCH_ALL === '1' || process.env.LEETCODE_BATCH_ALL === 'true') {
        return null;
    }

    const hit = firstEnv('LEETCODE_BATCH_LIMIT', ...fallbackKeys);
    if (!hit) {
        return defaultLimit;
    }

    const normalized = hit.value.trim().toLowerCase();
    if (ALL_TOKENS.has(normalized)) {
        return null;
    }

    const parsed = Number(hit.value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`无效的批量限制 ${hit.key}=${hit.value}（用正整数、all 或 LEETCODE_BATCH_ALL=1）`);
    }
    if (parsed === 0) {
        return null;
    }
    return Math.floor(parsed);
}

export function isFullBatchMode() {
    return parseBatchLimit() === null;
}

export function listProblemSlugs(problemsDir, readdirSync, existsSync, limit = parseBatchLimit()) {
    if (!existsSync(problemsDir)) {
        return [];
    }
    const all = readdirSync(problemsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
        .map((entry) => entry.name)
        .sort();
    if (limit === null) {
        return all;
    }
    return all.slice(0, limit);
}

export function logBatchLimit(action, picked, total) {
    const mode = picked === total ? '全量' : `限流 ${picked}/${total}`;
    console.log(`[batch] ${action}：${mode}（全量请设 LEETCODE_BATCH_ALL=1）`);
}
