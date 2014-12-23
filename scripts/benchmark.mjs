#!/usr/bin/env node
/**
 * 基准 CLI 入口：解析参数后调用 conformance runner。
 *
 *   pnpm bench
 *   pnpm bench --count 10
 *   pnpm bench --id two-sum
 *   pnpm bench --lang typescript,valkyrie
 *   pnpm bench:python --count 5
 *   pnpm bench --all
 *
 * 未在命令行指定的项仍可读环境变量（CI / 脚本兼容）。
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const conformanceRoot = join(root, "projects", "conformance");

const LANGUAGE_ALIASES = {
    python: "python",
    py: "python",
    typescript: "typescript",
    ts: "typescript",
    valkyrie: "valkyrie",
    v: "valkyrie",
};

const RUNNERS = {
    all: "src/runner/bench-all.ts",
    python: "src/runner/bench-python.ts",
    typescript: "src/runner/bench-typescript.ts",
    valkyrie: "src/runner/bench-valkyrie.ts",
};

function usage() {
    console.log(`用法: node scripts/benchmark.mjs [语言] [选项]

语言（可选，等同 bench:语言 脚本）:
  python | py          仅 Python
  typescript | ts      仅 TypeScript
  valkyrie | v           仅 Valkyrie
  （省略）               多语言（默认 python + typescript + valkyrie，可用 --lang 过滤）

选项:
  --count, -n <N>       最多跑 N 题（默认 50）
  --all                 跑全量题目
  --id <slug>           仅跑单题 id
  --ids <a,b,c>         逗号分隔多个 id
  --lang <列表>         多语言模式下指定语言（python,ts,valkyrie,all）
  --help, -h            显示帮助

示例:
  pnpm bench --count 10
  pnpm bench --id two-sum
  pnpm bench:typescript --count 20
  pnpm bench --lang ts,v --all`);
}

function normalizeLanguage(token) {
    const key = token.trim().toLowerCase();
    const language = LANGUAGE_ALIASES[key];
    if (!language) {
        throw new Error(`未知语言 ${token}（可用 python、typescript、valkyrie）`);
    }
    return language;
}

function parseCount(value, flag) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
        throw new Error(`无效的 ${flag}=${value}（须为正整数）`);
    }
    return Math.floor(parsed);
}

function takeValue(args, index, flag) {
    const value = args[index + 1];
    if (value === undefined || value.startsWith("-")) {
        throw new Error(`${flag} 需要参数值`);
    }
    return value;
}

function parseArgv(argv) {
    const args = argv.slice(2);
    let mode = "all";
    let help = false;
    let count = null;
    let all = false;
    let id = null;
    let ids = null;
    let lang = null;

    let index = 0;
    if (args[0] && !args[0].startsWith("-")) {
        const maybeLang = args[0].trim().toLowerCase();
        if (maybeLang in LANGUAGE_ALIASES) {
            mode = normalizeLanguage(maybeLang);
            index = 1;
        }
    }

    for (let i = index; i < args.length; i += 1) {
        const token = args[i];
        switch (token) {
            case "--help":
            case "-h":
                help = true;
                break;
            case "--count":
            case "-n":
                count = parseCount(takeValue(args, i, token), token);
                i += 1;
                break;
            case "--all":
                all = true;
                break;
            case "--id":
                id = takeValue(args, i, token);
                i += 1;
                break;
            case "--ids":
                ids = takeValue(args, i, token);
                i += 1;
                break;
            case "--lang":
                lang = takeValue(args, i, token);
                i += 1;
                break;
            default:
                throw new Error(`未知参数 ${token}（用 --help 查看用法）`);
        }
    }

    if (all && count !== null) {
        throw new Error("--all 与 --count 不能同时使用");
    }
    if (id && ids) {
        throw new Error("--id 与 --ids 不能同时使用");
    }
    if (lang && mode !== "all") {
        throw new Error("单语言脚本不需要 --lang");
    }

    return { mode, help, count, all, id, ids, lang };
}

function applyCliEnv(baseEnv, options) {
    const env = { ...baseEnv };

    if (options.all) {
        env.LEETCODE_BATCH_ALL = "1";
        delete env.LEETCODE_BENCH_LIMIT;
        delete env.LEETCODE_BATCH_LIMIT;
    } else if (options.count !== null) {
        env.LEETCODE_BENCH_LIMIT = String(options.count);
        delete env.LEETCODE_BATCH_ALL;
    }

    if (options.id) {
        env.LEETCODE_BENCH_ID = options.id;
        delete env.LEETCODE_BENCH_IDS;
    } else if (options.ids) {
        env.LEETCODE_BENCH_IDS = options.ids;
        delete env.LEETCODE_BENCH_ID;
    }

    if (options.lang) {
        env.LEETCODE_BENCH_LANG = options.lang;
    }

    return env;
}

function runBenchmark(mode, env) {
    const runner = join(conformanceRoot, RUNNERS[mode]);
    const result = spawnSync(process.execPath, ["--import", "tsx", runner], {
        cwd: conformanceRoot,
        env,
        stdio: "inherit",
    });

    if (result.error) {
        console.error(`bench: 无法启动 runner：${result.error.message}`);
        process.exit(1);
    }
    process.exit(result.status === null ? 1 : result.status);
}

function main() {
    try {
        const options = parseArgv(process.argv);
        if (options.help) {
            usage();
            return;
        }
        const env = applyCliEnv(process.env, options);
        runBenchmark(options.mode, env);
    } catch (err) {
        console.error(`bench: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
    }
}

main();
