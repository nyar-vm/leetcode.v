import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
export const LEETCODE_ROOT = join(SCRIPTS_DIR, '..');

/** 兄弟仓 sxo-framework 根目录（可用 `SXO_FRAMEWORK_ROOT` 覆盖）。 */
export const SXO_FRAMEWORK_ROOT = resolve(process.env.SXO_FRAMEWORK_ROOT ?? join(LEETCODE_ROOT, '..', '..', 'dxo 深度学习', 'sxo-framework'));

export const SXO_PACKAGES_DIR = join(SXO_FRAMEWORK_ROOT, 'projects', 'packages');

/** 供 `projects/conformance/package.json` 使用的 `link:` 相对路径（从 conformance 出发）。 */
export const SXO_LINK_FROM_CONFORMANCE = {
    '@sxo/mathematica': 'link:../../../../dxo 深度学习/sxo-framework/projects/packages/sxo-mathematica',
    '@sxo/matlab': 'link:../../../../dxo 深度学习/sxo-framework/projects/packages/sxo-matlab',
    '@sxo/core': 'link:../../../../dxo 深度学习/sxo-framework/projects/packages/sxo-core',
};

export const SXO_PACKAGE_NAMES = ['@sxo/mathematica', '@sxo/matlab', '@sxo/core'];

const SXO_PACKAGE_DIRS = {
    '@sxo/mathematica': 'sxo-mathematica',
    '@sxo/matlab': 'sxo-matlab',
    '@sxo/core': 'sxo-core',
};

export function assertSxoFrameworkPresent() {
    if (!existsSync(SXO_FRAMEWORK_ROOT)) {
        throw new Error(
            `找不到 sxo-framework：${SXO_FRAMEWORK_ROOT}\n` + '请 clone 到本机并设置 SXO_FRAMEWORK_ROOT（仅 pnpm link:sxo 需要）。',
        );
    }
    for (const name of SXO_PACKAGE_NAMES) {
        const pkgDir = join(SXO_PACKAGES_DIR, SXO_PACKAGE_DIRS[name]);
        if (!existsSync(join(pkgDir, 'package.json'))) {
            throw new Error(`缺少 SXO 包：${pkgDir}`);
        }
    }
}
