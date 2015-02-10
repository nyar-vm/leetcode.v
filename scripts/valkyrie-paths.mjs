import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
export const LEETCODE_ROOT = join(SCRIPTS_DIR, '..');

/** 兄弟仓 valkyrie.rs 根目录（可用 `VALKYRIE_RS_ROOT` 覆盖）。 */
export const VALKYRIE_RS_ROOT = resolve(process.env.VALKYRIE_RS_ROOT ?? join(LEETCODE_ROOT, '..', 'valkyrie.rs'));

export const VALKYRIE_PACKAGES_DIR = join(VALKYRIE_RS_ROOT, 'projects', 'packages');

/** 供各 workspace 包 `package.json` 使用的 `link:` 相对路径（从 `projects/conformance` 出发）。 */
export const VALKYRIE_LINK_FROM_CONFORMANCE = {
    '@valkyrie-language/legion': 'link:../../../valkyrie.rs/projects/packages/legion',
    '@valkyrie-language/vcc': 'link:../../../valkyrie.rs/projects/packages/vcc',
    '@valkyrie-language/vcc-unknown-wasm32': 'link:../../../valkyrie.rs/projects/packages/vcc-unknown-wasm32',
    '@valkyrie-language/vcc-win32-x64': 'link:../../../valkyrie.rs/projects/packages/vcc-win32-x64',
    '@valkyrie-language/vcc-linux-x64': 'link:../../../valkyrie.rs/projects/packages/vcc-linux-x64',
    '@valkyrie-language/vcc-darwin-x64': 'link:../../../valkyrie.rs/projects/packages/vcc-darwin-x64',
    '@valkyrie-language/vcc-darwin-arm64': 'link:../../../valkyrie.rs/projects/packages/vcc-darwin-arm64',
};

export const VALKYRIE_PACKAGE_NAMES = ['@valkyrie-language/legion', '@valkyrie-language/vcc', '@valkyrie-language/vcc-unknown-wasm32'];

export function assertValkyrieRsPresent() {
    if (!existsSync(VALKYRIE_RS_ROOT)) {
        throw new Error(`找不到 valkyrie.rs：${VALKYRIE_RS_ROOT}\n` + '请 clone 到 leetcode.v 同级，或设置环境变量 VALKYRIE_RS_ROOT。');
    }
    for (const name of VALKYRIE_PACKAGE_NAMES) {
        const folder = name.split('/').pop();
        const pkgDir = join(VALKYRIE_PACKAGES_DIR, folder);
        if (!existsSync(join(pkgDir, 'package.json'))) {
            throw new Error(`缺少 Valkyrie 包：${pkgDir}`);
        }
    }
}
