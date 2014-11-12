# AGENTS

本目录是 **leetcode.v** — LeetCode 题目在 Valkyrie（V）与 TypeScript 上的完备性测试、外部产物基准与对比看板。

**代理入口（工具无关）**：不假定 Cursor、Codex、Claude Code 或其他产品。任何自动化助手先读本文件。

**Skills（开放标准）**：可复用工作流放在 [Agent Skills](https://agentskills.io/specification) 格式目录
`.agents/skills/<name>/SKILL.md`（YAML `name` + `description` + 正文）。Codex、Cursor、Claude Code 等均支持该路径；`AGENTS.md`
管常驻约定，skill 管专题流程（按需加载）。

**刷题**：用户说「刷题」「做一题」「推进某 slug」时，指单题 **完整闭环** — 写题解 → 写实现 → 测 Valkyrie → 缺能力则上游演进。见
`.agents/skills/leetcode-practice/SKILL.md`。

兄弟仓（本机路径，勿写死进题目内容）：

| 仓               | 用途                                                    |
|------------------|---------------------------------------------------------|
| `../valkyrie.rs` | **Rust seed** `legion` CLI、`@valkyrie-language/vcc`、Wasm 编译与基准（leetcode 默认工具链） |
| `../valkyrie.v`  | V 语言 `core` / `std` / `std.adaptors._`（经根 `legions.von` 注册）；**不是** leetcode 用的 legion 可执行文件来源 |

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
| `legions.von`                                  | workspace 成员：`core`、`std`、`std.adaptors._`（见下文「维护者陷阱」）   |

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

## 维护者陷阱（常见误区）

本节记录自动化助手与新人易犯的 **概念混淆** 与 **操作坑**；细节流程仍以各 skill 为准。

### 1. legion 来自 `valkyrie.rs`，不是 `valkyrie.v` 自举 legion

| 产物 | 仓 | leetcode.v 是否默认使用 |
|------|-----|-------------------------|
| Rust seed `legion.exe`、wasm collect、`@valkyrie-language/vcc` | `../valkyrie.rs` | **是** — `conformance` 经 `VALKYRIE_RS_ROOT` 调 native 或 wasm |
| V 自举 `legion.tools` → `legion.mjs` / `legion.jar` 等 | `../valkyrie.v/projects/legion._/…` | **否** — 属 L2 自举门禁，与刷题 harness **不是同一条链** |

- **勿**在 `valkyrie.v` 里找 leetcode 要用的 `legion` 可执行文件。
- **勿**把「补 std」与「修 legion/vcc」混为一仓：`std` API → `valkyrie.v`；编译/链接/CLI → `valkyrie.rs`。
- 本机 `legion` 常不在 `PATH`；harness 默认解析 `VALKYRIE_RS_ROOT/target/release/legion.exe`（或 debug / wasm collect）。可设环境变量 `VALKYRIE_RS_ROOT`。

### 2. `legions.von` 不能只注册 `core` + `std`

`projects/std/legion.von` 声明 `std.adaptor.clr`、`std.adaptor.wasm` 等为 **workspace 依赖**。leetcode 根 `legions.von` 若缺少 adaptor 超工作空间，会出现：

```text
legion::planner::forced_workspace_dependency_missing
project 'std' requires workspace dependency 'std.adaptor.clr', but no workspace member was found
```

**正确成员**（路径相对 leetcode 根）：

```text
../valkyrie.v/projects/core
../valkyrie.v/projects/std
../valkyrie.v/projects/std.adaptors._    # 嵌套 legions，展开全部 adaptor
```

`pnpm link:valkyrie` 会重写 `legions.von`；脚本 `scripts/valkyrie-v-deps.mjs` 须与上表一致，避免 link 后再次踩坑。

### 3. legion CLI 标志：用 `--target`，不是 `-t`

当前 Rust seed legion 的 build/test 使用长选项：

```text
legion build <project-dir> --target node -o .cache/<slug>-node
legion test <project-dir> --target node
```

`-t node` 会报 `unexpected argument '-t' found`。skills 里若仍写 `-t`，以 **本文件与 legion `--help`** 为准。

`node` 在规划器里映射为 `wasm32-node-unknown-wasm`（见 `valkyrie.rs` planner 测试）。

### 4. `legion test` ≠ 对 `metadata.tests` 验题意

| 机制 | 验什么 |
|------|--------|
| `run_python_solver.py` / `run_ts_solver.ts` | **题意**：`metadata.json` 全量 `tests` |
| `legion build` | V 解能否编译、链接到 node/wasm 产物 |
| `legion test` | 工程内 `[test]` 或 `test/` 目录中的 **V 单测**；无则 **0 通过、跳过**，exit 0 仍可能 |

leetcode **不**在 `solution.v` 里写 `[benchmark]`；也 **不必**为每题复制 `metadata.tests` 进 `[test]`，除非刻意加 V 侧单测。完备性矩阵默认探测 build + test 退出码（非 strict 下 test 为空可接受）；算法对错以 Python/TS 参考解与 bench harness 为准。

### 5. 单题 `solvers/valkyrie/` 不在 workspace `members` 内是正常的

对题目目录执行 `legion build` 时，日志可能出现 `mode: package`、`未注册到 workspace members，已回退到 package 模式`。只要祖先链上能发现 leetcode 根 `legions.von` 且 std 依赖可解析，通常 **仍可成功构建**。不要把「未注册为 member」误判为必须把每题 slug 写进 `legions.von`。

### 6. 刷题闭环各步的「完成」标准

| 步骤 | 常见误判 |
|------|----------|
| ① coach `readme.md` | 把 LCD 旧稿（英文题面 + 难度标签行）当成已完成；须符合 `leetcode-coach`（中文、`## 问题` / `## 解答` / `## 复杂度分析`、无代码） |
| ② `solution.v` | 文件存在但 **空文件** 或仅 `# 阻塞：` 即宣称「已实现」 |
| ③ 测 V | 只跑 `legion build` 未对照 Python/TS；或把 seed legion 与自举 legion 混用导致环境不一致 |
| ④ 演进 | 在 leetcode.v 内嵌 std 副本；应在 `valkyrie.v` / `valkyrie.rs` 补能力后回到 ②③ |

### 7. 写 `solution.v` 时易错点（详见 `valkyrie-guide`）

- `ArrayList`：**逻辑 0-based** 用 `⁅i⁆`，勿把 LeetCode 下标直接套到 **`[i]`**（ordinal 1-based）。
- `i64` 异或：用 **`bit_xor`**；`^` 运算符主要在 `i32` 等类型上，勿照搬 TS 的 `^=`。
- `HashMap`：当前 std 提供 `HashMap::new(capacity)`、`insert` / `get`；勿假定存在 `from(iterator)` 等未实现构造器——缺 API 走 `valkyrie-evolution` backlog，勿在题解里 hack。

### 8. 跑测前环境

- `projects/conformance` 需 `pnpm install` 后才有 `tsx` 等依赖；根目录 `pnpm test:problems` 会拉起 filter 包。
- Python 参考解依赖本机 `python` 与题内 `pyproject.toml` 环境。

### 9. `metadata.tests` 大整数与 `null` 语义

- JSON 数字超过 $2^{53}-1$ 时，**生成/编辑 metadata 可能静默损坏**（如回文题 `1000000000000000000` 末位被抹平）；参考解算法正确仍会对不上 `expected`。修复时以算法重算 `expected`，或改用字符串键存大整数（需 harness 同步）。
- `expected: null` 表示 **无返回值断言**（原地修改、无解等）。TS `void` 解得到 `undefined`，harness 在 `ts-ref.ts` 中归一为 `null` 再比较。
- 无解数组题（如 `two-sum`）参考解应返回 `null`，勿返回 `[]`，与 metadata 一致。

## Agent Skills（`.agents/skills/`）

| Skill                   | 用途                                                 |
|-------------------------|------------------------------------------------------|
| **`leetcode-practice`** | **刷题全流程**（编排下列四步，用户说刷题时先加载）   |
| `leetcode-coach`        | ① 单题 `readme.md` 教练稿（语言无关）                |
| `leetcode-implement`    | ② `solvers/` 三端实现与 `metadata.tests`             |
| `valkyrie-guide`        | ② 写 V 时：语法、下标、std、legion                   |
| `valkyrie-evolution`    | ④ 按缺口在 `../valkyrie.v` / `../valkyrie.rs` 补能力 |

**勿**在仓库根自建 `skills/` 或提交 `.cursor/skills/` 副本；`.cursor/` 仅作本机可选映射（已 gitignore）。
