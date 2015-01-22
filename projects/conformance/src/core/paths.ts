import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** `leetcode.v` 仓库根目录。 */
export const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");

/** `@leetcode/conformance` 包根目录。 */
export const CONFORMANCE_ROOT = PACKAGE_ROOT;

/** 看板基准 JSON 输出目录。 */
export const BENCH_PUBLIC_DIR = join(LEETCODE_ROOT, "projects", "dashboard", "public");
