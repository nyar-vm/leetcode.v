/**
 * 为 benchmark-results.json 补全题目元数据（difficulty / tags / questionId）。
 * bench-all 新版本会自动写入；本脚本用于升级旧快照。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PROBLEMS } from "../projects/conformance/src/catalog.generated.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = join(root, "projects", "dashboard", "public", "benchmark-results.json");
const metaById = new Map(PROBLEMS.map((problem) => [problem.id, problem]));

const report = JSON.parse(readFileSync(reportPath, "utf8"));
report.catalogTotal = PROBLEMS.length;
report.rows = report.rows.map((row) => {
    const meta = metaById.get(row.id);
    return {
        ...row,
        questionId: row.questionId ?? meta?.questionId ?? 0,
        difficulty: row.difficulty ?? meta?.difficulty ?? "Unknown",
        tags: row.tags ?? meta?.tags ?? [],
    };
});

writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`已更新 ${report.rows.length} 行 · catalogTotal ${report.catalogTotal}`);
