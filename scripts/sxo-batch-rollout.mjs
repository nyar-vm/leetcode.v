#!/usr/bin/env node
/**
 * 批量为 catalog 前 N 题补齐 Wolfram (Sxo) / MATLAB (Sxo) 单脚本解、metadata.invoke，
 * 跑 conformance 单题脚本并写出 gap 报告。
 *
 * 用法（leetcode.v 根）：
 *   node scripts/sxo-batch-rollout.mjs
 *   LEETCODE_BATCH_LIMIT=20 node scripts/sxo-batch-rollout.mjs
 *   node scripts/sxo-batch-rollout.mjs --write-only
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { DEFAULT_BATCH_LIMIT, parseBatchLimit } from "./batch-limit.mjs";
import { solverBodiesFor } from "./sxo-batch-solver-bodies.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEETCODE_ROOT = join(__dirname, "..");
const CONFORMANCE_ROOT = join(LEETCODE_ROOT, "projects", "conformance");
const PROBLEMS_ROOT = join(LEETCODE_ROOT, "projects", "problems");
const REPORT_DIR = join(CONFORMANCE_ROOT, "reports");
const GAP_PATH = join(REPORT_DIR, "sxo-batch-gap.md");
const CATALOG_PATH = join(CONFORMANCE_ROOT, "src", "catalog.generated.ts");

const writeOnly = process.argv.includes("--write-only");

function loadCatalogProblems() {
    const text = readFileSync(CATALOG_PATH, "utf8");
    const problems = [];
    const re =
        /{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*questionId:\s*(\d+),/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        problems.push({ id: m[1], title: m[2], questionId: Number(m[3]) });
    }
    return problems;
}

function batchSlice(catalog) {
    const limit = parseBatchLimit({ defaultLimit: DEFAULT_BATCH_LIMIT });
    if (limit === null) {
        return catalog;
    }
    return catalog.slice(0, limit);
}

function invokeSymbol(metadata) {
    const ts = metadata.invoke?.typescript ?? "";
    const hit = ts.match(/Solution\(\)\.(\w+)/);
    return hit?.[1] ?? null;
}

function patchMetadata(problemRoot, symbol) {
    const metaPath = join(problemRoot, "metadata.json");
    const metadata = JSON.parse(readFileSync(metaPath, "utf8"));
    metadata.invoke = metadata.invoke ?? {};
    let changed = false;
    if (!metadata.invoke.wolframSxo) {
        metadata.invoke.wolframSxo = symbol;
        changed = true;
    }
    if (!metadata.invoke.matlabSxo) {
        metadata.invoke.matlabSxo = symbol;
        changed = true;
    }
    if (changed) {
        writeFileSync(metaPath, `${JSON.stringify(metadata, null, 4)}\n`, "utf8");
    }
    return metadata;
}

function writeSolver(problemRoot, dialect, content) {
    const sub = dialect === "wolfram" ? "wolfram-sxo" : "matlab-sxo";
    const file = dialect === "wolfram" ? "solution.wl" : "solution.m";
    const dir = join(problemRoot, "solvers", sub);
    mkdirSync(dir, { recursive: true });
    const path = join(dir, file);
    writeFileSync(path, content.endsWith("\n") ? content : `${content}\n`, "utf8");
    return path;
}

function runSolverScript(dialect, problemRoot) {
    const script =
        dialect === "wolfram"
            ? join(CONFORMANCE_ROOT, "scripts", "run_wolfram_sxo_solver.ts")
            : join(CONFORMANCE_ROOT, "scripts", "run_matlab_sxo_solver.ts");
    const rel = problemRoot.replaceAll("\\", "/");
    const result = spawnSync(
        "node",
        ["--import", "tsx", script, rel],
        {
            cwd: CONFORMANCE_ROOT,
            encoding: "utf8",
            timeout: 120_000,
        },
    );
    const ok = result.status === 0;
    const err = (result.stderr || result.stdout || "").trim();
    return { ok, err: err.slice(0, 500) };
}

function classifyGap(dialect, err) {
    if (!err) {
        return null;
    }
    const e = err.toLowerCase();
    if (e.includes("未安装") || e.includes("@sxo")) {
        return "S-005";
    }
    if (e.includes("阻塞")) {
        return "S-004";
    }
    if (dialect === "wolfram") {
        if (e.includes("got null") || e.includes("null")) {
            return "S-009";
        }
        if (e.includes("athena_unsupported") || e.includes("op=234")) {
            return "S-007";
        }
        if (e.includes("error node")) {
            return "S-006";
        }
        return "S-004";
    }
    if (e.includes("error node")) {
        return "S-008";
    }
    if (e.includes("function")) {
        return "S-011";
    }
    return "S-004";
}

function summarize(rows) {
    const sum = { wolfram: { pass: 0, fail: 0 }, matlab: { pass: 0, fail: 0 } };
    for (const row of rows) {
        if (row.wolfram.ok) {
            sum.wolfram.pass += 1;
        } else {
            sum.wolfram.fail += 1;
        }
        if (row.matlab.ok) {
            sum.matlab.pass += 1;
        } else {
            sum.matlab.fail += 1;
        }
    }
    return sum;
}

function gapHistogram(rows) {
    const hist = new Map();
    for (const row of rows) {
        for (const dialect of ["wolfram", "matlab"]) {
            const gap = row[dialect].gap;
            if (gap && !row[dialect].ok) {
                hist.set(gap, (hist.get(gap) ?? 0) + 1);
            }
        }
    }
    return [...hist.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function renderGapMarkdown(rows, batchSize, generatedAt) {
    const sum = summarize(rows);
    const hist = gapHistogram(rows);
    const lines = [
        "# SXO 批量补题 Gap（catalog 前 N 题）",
        "",
        `生成时间：${generatedAt}`,
        "",
        `批量范围：catalog 前 **${batchSize}** 题（与 \`LEETCODE_BATCH_LIMIT\` / batch-limit 默认一致）。`,
        "",
        "能力 backlog 主表：`.agents/skills/sxo-evolution/references/capability-backlog.md`",
        "",
        "## 汇总",
        "",
        "| 语言 | 测例全绿 | 失败 |",
        "|------|----------|------|",
        `| Wolfram (Sxo) | ${sum.wolfram.pass} | ${sum.wolfram.fail} |`,
        `| MATLAB (Sxo) | ${sum.matlab.pass} | ${sum.matlab.fail} |`,
        "",
        "## Gap 频次（失败题）",
        "",
        "| Gap ID | 次数 | 说明 |",
        "|--------|------|------|",
    ];
    const gapNotes = {
        "S-004": "循环 / 控制流 evaluate 未稳定（总类）",
        "S-005": "@sxo/* npm 未安装",
        "S-006": "Wolfram `Do` / `Return` / 嵌套循环",
        "S-007": "Wolfram `Table` / `Flatten` / Athena op",
        "S-008": "MATLAB `function` + `for` + `return`",
        "S-009": "Wolfram `:=` 用户函数求值为 `Null`",
        "S-010": "字符串 Part / 字符访问",
        "S-011": "MATLAB 用户函数体 `error node`",
        "S-012": "链表（数组模拟）",
        "S-013": "排序 / 双指针多指针",
        "S-014": "二维矩阵",
        "S-015": "回溯 / 递归 / DFS",
        "S-016": "哈希 / 关联结构",
        "S-017": "正则 / 通配 / DP 表",
    };
    for (const [id, count] of hist) {
        lines.push(`| ${id} | ${count} | ${gapNotes[id] ?? "见逐题表"} |`);
    }
    if (hist.length === 0) {
        lines.push("| — | 0 | 无失败或未跑测 |");
    }
    lines.push("", "## 逐题", "");
    lines.push("| # | slug | Wolfram | MATLAB | Gap (W) | Gap (M) | 摘要 |");
    lines.push("|---|------|---------|--------|---------|---------|------|");
    for (const row of rows) {
        const w = row.wolfram.ok ? "pass" : "fail";
        const m = row.matlab.ok ? "pass" : "fail";
        const note = row.wolfram.err || row.matlab.err || "";
        const short =
            note
                .split("\n")
                .find((line) => line.trim().length > 0)
                ?.slice(0, 80) ?? "";
        lines.push(
            `| ${row.questionId} | \`${row.slug}\` | ${w} | ${m} | ${row.wolfram.gap ?? "—"} | ${row.matlab.gap ?? "—"} | ${short.replace(/\|/g, "/")} |`,
        );
    }
    lines.push("");
    return `${lines.join("\n")}\n`;
}

function main() {
    const catalog = loadCatalogProblems();
    const batch = batchSlice(catalog);
    const rows = [];
    const generatedAt = new Date().toISOString();

    mkdirSync(REPORT_DIR, { recursive: true });

    for (const problem of batch) {
        const problemRoot = join(PROBLEMS_ROOT, problem.id);
        const metaPath = join(problemRoot, "metadata.json");
        if (!existsSync(metaPath)) {
            continue;
        }
        const metadata = JSON.parse(readFileSync(metaPath, "utf8"));
        const symbol = invokeSymbol(metadata);
        if (!symbol) {
            rows.push({
                questionId: problem.questionId,
                slug: problem.id,
                wolfram: { ok: false, err: "无 invoke.typescript 符号", gap: "S-004" },
                matlab: { ok: false, err: "无 invoke.typescript 符号", gap: "S-004" },
            });
            continue;
        }

        const bodies = solverBodiesFor(problem.id, symbol, metadata);
        writeSolver(problemRoot, "wolfram", bodies.wolfram);
        writeSolver(problemRoot, "matlab", bodies.matlab);
        patchMetadata(problemRoot, symbol);

        const row = {
            questionId: problem.questionId,
            slug: problem.id,
            expectedGap: bodies.gap ?? "S-004",
            wolfram: { ok: false, err: "", gap: bodies.gapWolfram ?? bodies.gap ?? null },
            matlab: { ok: false, err: "", gap: bodies.gapMatlab ?? bodies.gap ?? null },
        };

        if (!writeOnly) {
            row.wolfram = { ...row.wolfram, ...runSolverScript("wolfram", problemRoot) };
            row.matlab = { ...row.matlab, ...runSolverScript("matlab", problemRoot) };
            if (!row.wolfram.ok && !row.wolfram.gap) {
                row.wolfram.gap = classifyGap("wolfram", row.wolfram.err);
            }
            if (!row.matlab.ok && !row.matlab.gap) {
                row.matlab.gap = classifyGap("matlab", row.matlab.err);
            }
        }

        rows.push(row);
        process.stdout.write(`[sxo-batch] #${problem.questionId} ${problem.id}\n`);
    }

    writeFileSync(GAP_PATH, renderGapMarkdown(rows, batch.length, generatedAt), "utf8");
    console.log(`\nGap 报告：${GAP_PATH}`);
    if (writeOnly) {
        console.log("（--write-only：未跑 conformance 测例）");
    }
}

main();
