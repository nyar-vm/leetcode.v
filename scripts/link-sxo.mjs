#!/usr/bin/env node
/**
 * 可选：将 conformance 的 @sxo/* 从 npm 切到本地 sxo-framework（上游开发用）。
 * 默认不必运行；`pnpm install` 已安装 npm 发布的 @sxo/mathematica、@sxo/matlab。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

import {
    SXO_FRAMEWORK_ROOT,
    SXO_LINK_FROM_CONFORMANCE,
    assertSxoFrameworkPresent,
    LEETCODE_ROOT,
} from "./sxo-paths.mjs";

assertSxoFrameworkPresent();

console.log("SXO 本地 link（覆盖 npm optionalDependencies）");
console.log(`  sxo-framework: ${SXO_FRAMEWORK_ROOT}`);

const conformancePkgPath = join(LEETCODE_ROOT, "projects", "conformance", "package.json");
const pkg = JSON.parse(readFileSync(conformancePkgPath, "utf8"));

pkg.optionalDependencies = {
    ...pkg.optionalDependencies,
    ...SXO_LINK_FROM_CONFORMANCE,
};

writeFileSync(conformancePkgPath, `${JSON.stringify(pkg, null, 4)}\n`, "utf8");

console.log("\n在 conformance 安装 link: 依赖…");
const install = spawnSync("pnpm", ["install"], {
    cwd: join(LEETCODE_ROOT, "projects", "conformance"),
    stdio: "inherit",
    shell: true,
});
if (install.status !== 0) {
    process.exit(install.status ?? 1);
}

console.log("\n已切到本地 @sxo/*。恢复 npm 版本请改回 package.json 中的 ^0.0.6 并 pnpm install。");
