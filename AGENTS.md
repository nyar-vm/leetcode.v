# AGENTS

本目录是 **leetcode.v** — LeetCode 题目在 Valkyrie（V）与 TypeScript 上的完备性测试、外部产物基准与对比看板。

**代理入口（工具无关）**：不假定 Cursor、Codex、Claude Code 或其他产品。任何自动化助手先读本文件。

**Skills（开放标准）**：可复用工作流放在 [Agent Skills](https://agentskills.io/specification) 格式目录 `.agents/skills/<name>/SKILL.md`（YAML `name` + `description` + 正文）。Codex、Cursor、Claude Code 等均支持该路径；`AGENTS.md` 管常驻约定，skill 管专题流程（按需加载）。

兄弟仓（本机路径，勿写死进题目内容）：

| 仓               | 用途                                                    |
|------------------|---------------------------------------------------------|
| `../valkyrie.rs` | `legion` CLI、`@valkyrie-language/vcc`、Wasm 编译与基准 |
| `../valkyrie.v`  | V 语言 `core` / `std`（经根 `legions.von` 注册）        |

## 标识符（slug / id / questionId）

| 术语           | 含义                                                                                        | 示例                                                                       |
|----------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **slug**       | LeetCode 题面 URL 路径段；**磁盘目录名**                                                    | `two-sum` → `projects/problems/two-sum/`、`leetcode.com/problems/two-sum/` |
| **id**         | 仓内 catalog / 跑测键；`metadata.json` 的 `id`、`ProblemDefinition.id`、`LEETCODE_BENCH_ID` | `two-sum`（**现实现中与 slug 同字符串**，勿混用语义）                      |
| **questionId** | LeetCode 官方数字题号                                                                       | `1`（#1 Two Sum）                                                          |

路径、readme 标题链接、LeetCode URL 一律用 **slug**；脚本过滤、基准报告行名用 **id**。

## 目录约定

| 路径                                           | 用途                                                                        |
|------------------------------------------------|-----------------------------------------------------------------------------|
| `projects/problems/<slug>/`                    | 单题：`metadata.json`、`readme.md`（教练稿）、`solvers/`                    |
| `projects/problems/<slug>/solvers/python/`     | LCD 参考解：`solution.py` + `pyproject.toml`                                |
| `projects/problems/<slug>/solvers/typescript/` | 手写 TS 解：`solution.ts` + `package.json`                                  |
| `projects/problems/<slug>/solvers/valkyrie/`   | 手写 V 解：`solution.v` + `legion.von`（`entry: "solution.v"`）             |
| `projects/conformance/`                        | 完备性矩阵、TS/Python/V 跑测、**外部产物基准**                              |
| `projects/dashboard/`                          | Vue 看板（缓存 `benchmark-results.json`，Vega-Lite 可视化）                 |
| `scripts/`                                     | `format.mjs`、`batch-limit.mjs`、`link-valkyrie.mjs`、`valkyrie-v-deps.mjs` |
| `legions.von`                                  | workspace 成员：`../valkyrie.v/projects/core`、`std`                        |

**禁止**：程序化批量生成 V 解、在 `.v` 里嵌 `# ```legion` cargo-script、把 solver 再套一层 `source/` 目录（除非 `legion`
规划器明确要求）。

## 题目元数据

- `metadata.json`：`id`（仓内键）、`questionId`（LeetCode 题号）、`difficulty`、`tags`、`tests[]`、`invoke`（如 `Solution().twoSum`
  ）。目录名 = **slug**（与 `id` 同值）。
- `projects/conformance/src/catalog.generated.ts` 为目录索引， **勿手改**。
- 大批量跑测默认限 **50** 题（`scripts/batch-limit.mjs`）；全量需 `LEETCODE_BATCH_ALL=1`。
- 单题基准：`LEETCODE_BENCH_ID=two-sum pnpm bench`。

## 题解文档（`readme.md`）

每题根目录应有 `readme.md`（教练稿）。格式与流程见 `.agents/skills/leetcode-coach/SKILL.md`。

硬性要求：

1. **标题即链接**：`# [英文题名](https://leetcode.com/problems/<slug>/)`
2. **元数据不进 readme**：题号、难度、标签以 `metadata.json` 为准，readme **不**重复 LeetCode / 难度 / 标签行。
3. **正文汉化**：问题、示例、约束用中文。
4. **必须含**：`## 问题`、`## 解答`、`## 复杂度分析`（内含 `### 时间复杂度`、`### 空间复杂度` 各一段 $O (...)$ + 独立理由段）。
5. **由浅入深**：`## 解答` 用 `###` 小标题 + 段落（ **不用**有序列表）；瓶颈/优化须具名（如 `### 补数重复扫描瓶颈`、
   `### 哈希表一次遍历优化`），困难题可多轮； **禁止**独立 `进阶` / Follow-up 小节。
6. **语言无关**：readme **不得**出现编程语言、代码块、函数/类名、`invoke`、`solvers/` 等实现细节（题面符号如 `nums` 除外）。
7. **数学用 LaTeX**；题面符号与示例输入输出用反引号。
8. **不**粘贴完整英文题面；正文中文表述。

## 求解器约定

| 语言       | 入口                                          | 说明                                                                   |
|------------|-----------------------------------------------|------------------------------------------------------------------------|
| Python     | `invoke.python`                               | 数据集参考，与 `tests` 对齐                                            |
| TypeScript | `export class Solution` + `invoke.typescript` | 手写，与 Python 同算法语义                                             |
| Valkyrie   | `solution.v` + `legion.von`                   | `core: true`、`std: true`、`target: node`；**无** `[benchmark]` 烟雾块 |

`legion.von` 示例字段：`entry: "solution.v"`、`dependencies: { core: true, std: true }`。

## 基准测试

- **外部基准**：先 `legion build` 得到产物，再用 harness 对 **metadata.tests** 计时不依赖源码内 `[benchmark]`。
- TS：经 `run_ts_solver.ts` 对 `solution.ts` 跑全量测试并计时。
- 编排：`pnpm bench` → `@leetcode/conformance` `bench-all.ts`。
- 看板：`pnpm dashboard`；结果写入 `projects/dashboard/public/benchmark-results.json`。

## 格式化与链接

```text
pnpm link:valkyrie    # 链到兄弟仓 vcc（按需）
pnpm fmt              # Biome，4 空格
pnpm fmt:check
pnpm test:problems    # 完备性
pnpm bench            # 基准
pnpm dashboard        # 看板 dev
```

- Biome 扫描：`scripts/`、`conformance/`、`dashboard/`、根 manifest、 **仅** `projects/problems/**/metadata.json`（不扫海量
  solver `package.json`）。
- **中文**写注释与 `readme.md`； **commit message** 用 gitmoji + 英文 subject/body（与花火引擎工作区一致）。

## 代理检索纪律

- **禁止**对工作区做 `**/*` 或无界全量 glob（`node_modules`、数万 `metadata.json` 会拖垮会话）。
- 已知 slug → 直读 `projects/problems/<slug>/`（`LEETCODE_BENCH_ID` 等环境变量填 **id**，现与 slug 同字符串）。
- 搜代码 → 限定目录（如 `projects/conformance/src`）并带 `head_limit`。
- 列题目 → 读 `catalog.generated.ts` 或 `metadata.json`，不要递归枚举整个 `problems/`。

## Agent Skills（`.agents/skills/`）

| Skill | 用途 |
|-------|------|
| `leetcode-coach` | 单题 `readme.md` 教练稿（语言无关） |
| `leetcode-implement` | `solvers/` 三端实现与 `metadata.tests` |
| `valkyrie-guide` | V 语法、**下标约定**、std、legion 布局 |

**勿**在仓库根自建 `skills/` 或提交 `.cursor/skills/` 副本；`.cursor/` 仅作本机可选映射（已 gitignore）。
