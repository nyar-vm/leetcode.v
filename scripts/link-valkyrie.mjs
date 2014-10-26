#!/usr/bin/env node
import { existsSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

import {
    VALKYRIE_PACKAGES_DIR,
    VALKYRIE_RS_ROOT,
    assertValkyrieRsPresent,
    LEETCODE_ROOT,
} from "./valkyrie-paths.mjs";
import { assertValkyrieVPresent, leetcodeLegionsVon } from "./valkyrie-v-deps.mjs";

assertValkyrieRsPresent();
assertValkyrieVPresent();

const wasmCollect = join(VALKYRIE_PACKAGES_DIR, "vcc-unknown-wasm32", "legion.mjs");
const wasmReady = existsSync(wasmCollect);

console.log("Valkyrie 本地 link 检查");
console.log(`  valkyrie.rs: ${VALKYRIE_RS_ROOT}`);
console.log(
    `  wasm collect: ${wasmReady ? "已装配" : "未装配（需在 valkyrie.rs 运行 pnpm assemble）"}`,
);

const nativeRelease = join(VALKYRIE_RS_ROOT, "target", "release", "legion.exe");
const nativeDebug = join(VALKYRIE_RS_ROOT, "target", "debug", "legion.exe");
if (existsSync(nativeRelease)) {
    console.log(`  native legion: ${nativeRelease}`);
} else if (existsSync(nativeDebug)) {
    console.log(`  native legion: ${nativeDebug}`);
} else {
    console.log("  native legion: 未构建（可选 cargo build -p legion --release）");
}

console.log("\n在 conformance / dashboard 安装 link: 依赖…");
for (const pkg of ["projects/conformance", "projects/dashboard"]) {
    const install = spawnSync("pnpm", ["install"], {
        cwd: join(LEETCODE_ROOT, pkg),
        stdio: "inherit",
        shell: true,
    });
    if (install.status !== 0) {
        process.exit(install.status ?? 1);
    }
}

writeFileSync(join(LEETCODE_ROOT, "legions.von"), leetcodeLegionsVon(), "utf8");

console.log(`\nV 标准库：workspace 成员（legions.von → valkyrie.v/projects/core|std）`);
console.log('各题 legion.von 使用 `core: true` / `std: true`（等同 version: "workspace"）。');
console.log("运行时通过 VALKYRIE_RS_ROOT（默认 ../valkyrie.rs）调用 legion.exe / wasm collect。");
console.log("  pnpm test:problems   — TS 完备性 + V 编译/测试");
console.log("  pnpm bench           — 生成 TS vs Wasm 基准数据");
console.log("  pnpm dashboard       — Vue 对比看板");
