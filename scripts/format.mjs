#!/usr/bin/env node
/**
 * Biome 格式化入口（范围见根目录 biome.json `files.includes`）。
 * 含各题 `projects/problems/<id>/metadata.json`，不含 solver 内 package.json。
 *
 *   pnpm fmt
 *   pnpm fmt:check
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const biomeCli = join(dirname(require.resolve("@biomejs/biome/package.json")), "bin", "biome");

const checkOnly = process.argv.includes("--check");
const args = ["format", ...(checkOnly ? [] : ["--write"]), "."];

const result = spawnSync(process.execPath, [biomeCli, ...args], {
    cwd: root,
    stdio: "inherit",
});

if (result.error) {
    console.error(`fmt: 无法启动 Biome：${result.error.message}`);
    process.exit(1);
}

process.exit(result.status === null ? 1 : result.status);
