/**
 * 为各语言 benchmark-*.json 补全题目元数据（difficulty / tags / questionId）。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PROBLEMS } from "../projects/conformance/src/catalog.generated.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "projects", "dashboard", "public");
const metaById = new Map(PROBLEMS.map((problem) => [problem.id, problem]));

const files = [
    "benchmark-python.json",
    "benchmark-typescript.json",
    "benchmark-valkyrie.json",
    "benchmark-results.json",
];

for (const name of files) {
    const reportPath = join(publicDir, name);
    if (!existsSync(reportPath)) {
        continue;
    }
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
    console.log(`已更新 ${name} · ${report.rows.length} 行`);
}
