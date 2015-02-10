#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

import { VALKYRIE_PACKAGES_DIR, VALKYRIE_RS_ROOT, assertValkyrieRsPresent, LEETCODE_ROOT } from './valkyrie-paths.mjs';
import { assertValkyrieVPresent, leetcodeLegionsVon } from './valkyrie-v-deps.mjs';

assertValkyrieRsPresent();
assertValkyrieVPresent();

const wasmCollect = join(VALKYRIE_PACKAGES_DIR, 'vcc-unknown-wasm32', 'legion.mjs');
const wasmReady = existsSync(wasmCollect);

const nativeVccCandidates = [
    join(VALKYRIE_PACKAGES_DIR, 'vcc-win32-x64', 'vcc.win32-x64-msvc.node'),
    join(VALKYRIE_PACKAGES_DIR, 'vcc-linux-x64', 'vcc.linux-x64-musl.node'),
    join(VALKYRIE_PACKAGES_DIR, 'vcc-darwin-x64', 'vcc.darwin-x64.node'),
    join(VALKYRIE_PACKAGES_DIR, 'vcc-darwin-arm64', 'vcc.darwin-arm64.node'),
];
const nativeVcc = nativeVccCandidates.find((candidate) => existsSync(candidate));

console.log('Valkyrie 本地 link 检查');
console.log(`  valkyrie.rs: ${VALKYRIE_RS_ROOT}`);
console.log(`  wasm collect: ${wasmReady ? '已装配' : '未装配（需在 valkyrie.rs 运行 node scripts/build.mjs capability）'}`);
if (nativeVcc) {
    console.log(`  native vcc: ${nativeVcc}`);
} else {
    console.log('  native vcc: 未安装（可选 node scripts/build.mjs napi）');
}

console.log('\n在 conformance / dashboard 安装 link: 依赖…');
for (const pkg of ['projects/conformance', 'projects/dashboard']) {
    const install = spawnSync('pnpm', ['install'], {
        cwd: join(LEETCODE_ROOT, pkg),
        stdio: 'inherit',
        shell: true,
    });
    if (install.status !== 0) {
        process.exit(install.status ?? 1);
    }
}

writeFileSync(join(LEETCODE_ROOT, 'legions.von'), leetcodeLegionsVon(), 'utf8');

console.log(`\nV 标准库：workspace 成员（legions.von → valkyrie.v/projects/core|std|std.adaptors._）`);
console.log('各题 legion.von 使用 `core: true` / `std: true`（等同 version: "workspace"）。');
console.log('运行时通过 @valkyrie-language/vcc 宿主路由（native platform collect 或 wasm collect）。');
console.log('  pnpm test:problems   — TS 完备性 + V 编译/测试');
console.log('  pnpm bench           — 生成 TS vs Wasm 基准数据');
console.log('  pnpm dashboard       — Vue 对比看板');
