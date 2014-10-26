import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const LEETCODE_ROOT_FROM_PACKAGE = join(PACKAGE_ROOT, "..", "..");
