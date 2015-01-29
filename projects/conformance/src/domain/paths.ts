import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** `leetcode.v` 仓库根目录。 */
export const LEETCODE_ROOT = join(PACKAGE_ROOT, "..", "..");

/** 历史别名，与 `LEETCODE_ROOT` 同值。 */
export const LEETCODE_ROOT_FROM_PACKAGE = LEETCODE_ROOT;

/** `@leetcode/conformance` 包根目录。 */
export const CONFORMANCE_ROOT = PACKAGE_ROOT;

/** 不可变运行记录根目录。 */
export const CONFORMANCE_CACHE_ROOT = join(LEETCODE_ROOT, ".cache", "conformance");

/** 看板基准 JSON 投影输出目录。 */
export const BENCH_PUBLIC_DIR = join(LEETCODE_ROOT, "projects", "dashboard", "public");
