# AGENTS

本目录是 **leetcode.v** — LeetCode 题目在 Valkyrie（V）与 TypeScript 上的完备性测试、外部产物基准与对比看板。

**代理入口（工具无关）**：不假定 Cursor、Codex、Claude Code 或其他产品。任何自动化助手先读本文件。

**Skills（开放标准）**：可复用工作流放在 [Agent Skills](https://agentskills.io/specification) 格式目录
`.agents/skills/<name>/SKILL.md`（YAML `name` + `description` + 正文）。Codex、Cursor、Claude Code 等均支持该路径；`AGENTS.md`
管常驻约定，skill 管专题流程（按需加载）。

**刷题**：用户说「刷题」「做一题」「推进某 slug」时，指单题 **完整闭环** — 写题解 → 写实现 → 测 Valkyrie → 缺能力则上游演进。见
`.agents/skills/leetcode-practice/SKILL.md`。

兄弟仓（本机路径，勿写死进题目内容）：

| 仓               | 用途                                                                                                              |
|------------------|-------------------------------------------------------------------------------------------------------------------|
| `../valkyrie.rs` | **装配层**：Rust seed `legion` CLI、`@valkyrie-language/vcc`、manifest/收集/构建编排与 wasm 产物装配（leetcode 默认工具链） |
| `../nyar-vm.rs`  | **解析与优化层**：`nyar-language` / `nyar-optimizer` / `nyar-emitter`（HIR、`[export]`、wasm 降低、Node `callExport` glue）；经 `valkyrie.rs` `[patch]` 链接 |
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
| `projects/problems/<slug>/solvers/python/`     | LCD 脚手架解：`solution.py` + `pyproject.toml`                              |
| `projects/problems/<slug>/solvers/typescript/` | 手写 TS 解：`solution.ts` + `package.json`                                  |
| `projects/problems/<slug>/solvers/valkyrie/`   | 手写 V 解：`solution.v` + `legion.von`（`entry: "solution.v"`）             |
| `projects/conformance/`                        | 完备性矩阵、TS/Python/V 跑测、**外部产物基准**                              |
| `projects/dashboard/`                          | Vue 看板（合并 `benchmark-typescript.json` / `benchmark-valkyrie.json`，ECharts 可视化） |
| `scripts/`                                     | `format.mjs`、`reword.mjs`、`batch-limit.mjs`、`link-valkyrie.mjs`、`valkyrie-v-deps.mjs` |
| `legions.von`                                  | workspace 成员：`core`、`std`、`std.adaptors._`（见下文「维护者陷阱」）     |

**禁止**：程序化批量生成 V 解、在 `.v` 里嵌 `# ```legion` cargo-script、把 solver 再套一层 `source/` 目录（除非 `legion`
规划器明确要求）。

## 题目元数据

- `metadata.json`：`id`（仓内键）、`questionId`（LeetCode 题号）、`difficulty`、`tags`、`tests[]`、`invoke`（如 `Solution().twoSum`
  ）。目录名 = **slug**（与 `id` 同值）。
- `projects/conformance/src/catalog.generated.ts` 为目录索引， **勿手改**。
- 大批量跑测默认限 **50** 题（`scripts/batch-limit.mjs`）；全量需 `LEETCODE_BATCH_ALL=1`。
- 单题基准：`pnpm bench --id two-sum`（或 `LEETCODE_BENCH_ID=two-sum pnpm bench`）。

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

**参考实现**：仅指 `readme.md` 题解（语言无关的最优算法权威）。`solvers/` 下 Python、TypeScript、Valkyrie 均为 **实现**
，须与题解同阶同语义；不得以某一语言实现充当「参考实现」。

## 求解器约定

| 语言       | 入口                                          | 说明                                                                                               |
|------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------|
| Python     | `invoke.python`                               | LCD 脚手架实现，算法须与题解一致；完备性跑测用                                                     |
| TypeScript | `export class Solution` + `invoke.typescript` | 手写实现，算法须与题解一致                                                                         |
| Valkyrie   | `solution.v` + `legion.von`                   | 手写实现，算法须与题解一致；`core: true`、`std: true`、`target: node`；**无** `[benchmark]` 烟雾块 |

`legion.von` 示例字段：`entry: "solution.v"`、`dependencies: { core: true, std: true }`。

## 基准测试

- **外部基准**：先 `legion build` 得到 wasm + js glue，再在 harness 里对 **metadata.tests** 计时；leetcode **不在** `solution.v` 写 `[benchmark]`。
- **TS 运行**：harness 单进程加载题解（`tsx` 转译发生在计时外），预热后只对全量 `metadata.tests` 循环取中位数 → `runtimeMs`（不含每次冷启动 Node）。
- **V 编译**：`pnpm bench` 对 `legion build --target node` 计时 → `vCompileMs`（**不**调用 `legion bench`）。
- **V 运行**：`vRuntimeMs` 待 wasm 导出 invoke + `run_v_solver` 接线后补全；缺运行时分 **不算 error**（看板标为 missing）。
- 编排：`pnpm bench` → `scripts/benchmark.mjs` → `@leetcode/conformance` `bench-all.ts`（支持 `--count`、`--id`、`--lang` 等 CLI）。
- 看板：`pnpm dashboard`；基准按语言写入 `projects/dashboard/public/benchmark-typescript.json` 与 `benchmark-valkyrie.json`（`pnpm bench:typescript` / `pnpm bench:valkyrie`，或 `pnpm bench --lang typescript,valkyrie`）。

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
- **中文**写注释与 `readme.md`（commit message 例外，见下节）。

## Git 提交（gitmoji）

本仓所有 commit **强制** 遵守下列约定。

### 格式

- subject **必须以一个真实 gitmoji 字符开头**（如 ✨ 🐛 📝 ♻️ ⬆️ 🔧 🧪）。禁止 `?` / Conventional Commit 前缀 / 描述词冒充 emoji / 多个 emoji。
- **subject 与 body 用英文**。注释、readme、skill 正文仍用中文。
- **subject 末尾禁止句号 `.`**。body 句子正常用句号。
- **全文禁止 `;` 与 `；`**（subject 与 body，改用句号或分行）。
- **禁止内部计划/里程碑代号**：`Phase 1`、`phase-1`、`M0`/`Gate-N`、roadmap 切片名等 **一律不进** commit message。
- **标识符必须反引号**：slug / 类型 / 函数 / 字段 / 路径 / 模块名，如 `` `two-sum` ``、`` `solution.v` ``、`` `legions.von` ``、`` `assertTestCase` ``、`` `metadata.tests` ``。
- **禁止含糊缩写**：写全称（约定俗成的 `BFS`/`DFS` 可保留；指 TypeScript 时写 `TypeScript`，勿写 bare `TS`）。
- **版本号不进 commit message**（如 `4.1.11`），改用「patched releases」等表述。

### UTF-8 落盘（Windows）

- **禁止**用 PowerShell here-string / 控制台默认编码写带 emoji 的 `git commit -m`（易变成 `?`）。
- **推荐**：`node scripts/reword.mjs`、Node/Python 写 UTF-8 临时文件 + `git commit -F`，或 `git commit -F` 指向 UTF-8 消息文件。
- PowerShell 会把 `` ` `` 当转义；在脚本里写 commit message 的反引号时用 `chr(96)` 拼接，勿手写 `` ` ``。

### 批量 reword（`scripts/reword.mjs`）

修正已提交但 message 不合规的 commit（如缺反引号、subject 带句号、误用 `TS`）：

```text
# 1. 查看待改范围
git log --oneline origin/dev..HEAD

# 2. 按从旧到新顺序写消息块（块间单独一行 ---），保存为 reword.pending.txt（勿提交，已 gitignore）
#    格式见 scripts/reword.example.txt

# 3. 校验
node scripts/reword.mjs --lint --file reword.pending.txt
node scripts/reword.mjs --lint-log --base origin/dev

# 4. 预览
node scripts/reword.mjs --dry-run --file reword.pending.txt --base origin/dev

# 5. 执行（工作区须干净）
node scripts/reword.mjs --file reword.pending.txt --base origin/dev
```

`--base` 默认为 `origin/dev`。reword 会改写历史，仅对 **未推送** 或已协商的 `dev` 分支使用，禁止对 `master` force-push。

## 代理检索纪律

- **禁止**对工作区做 `**/*` 或无界全量 glob（`node_modules`、数万 `metadata.json` 会拖垮会话）。
- 已知 slug → 直读 `projects/problems/<slug>/`（`LEETCODE_BENCH_ID` 等环境变量填 **id**，现与 slug 同字符串）。
- 搜代码 → 限定目录（如 `projects/conformance/src`）并带 `head_limit`。
- 列题目 → 读 `catalog.generated.ts` 或 `metadata.json`，不要递归枚举整个 `problems/`。

## 维护者陷阱（常见误区）

本节记录自动化助手与新人易犯的 **概念混淆** 与 **操作坑**；细节流程仍以各 skill 为准。

### 1. legion 来自 `valkyrie.rs`，不是 `valkyrie.v` 自举 legion

| 产物                                                           | 仓                                  | leetcode.v 是否默认使用                                        |
|----------------------------------------------------------------|-------------------------------------|----------------------------------------------------------------|
| Rust seed `legion.exe`、wasm collect、`@valkyrie-language/vcc` | `../valkyrie.rs`                    | **是** — `conformance` 经 `VALKYRIE_RS_ROOT` 调 native 或 wasm |
| V 自举 `legion.tools` → `legion.mjs` / `legion.jar` 等         | `../valkyrie.v/projects/legion._/…` | **否** — 属 L2 自举门禁，与刷题 harness **不是同一条链**       |

- **勿**在 `valkyrie.v` 里找 leetcode 要用的 `legion` 可执行文件。
- **勿**把「补 std」与「修 legion/vcc」混为一仓：`std` API → `valkyrie.v`；编译/链接/CLI → `valkyrie.rs`。
- 本机 `legion` 常不在 `PATH`；harness 默认解析 `VALKYRIE_RS_ROOT/target/release/legion.exe`（或 debug / wasm
  collect）。可设环境变量 `VALKYRIE_RS_ROOT`。

### 2. `valkyrie.rs` 是装配层，解析/优化在 `nyar-vm.rs`

| 层 | 仓 | 典型改动 |
| --- | --- | --- |
| 装配 | `../valkyrie.rs` | `legion` manifest、`planner` source closure、CLI、`legion build` 缓存与产物路径 |
| 解析/优化/降低 | `../nyar-vm.rs` | HIR、`[export]` → wasm 导出表、MIR、`wasm_js_glue`（`callExport`）、`nyar-optimizer` |

- **勿**在 `valkyrie.rs` 的 `asgard` 或 `legion` 里找 LeetCode wasm invoke / 多 export 的 emitter 实现（见 backlog **V-017**）。
- **勿**在 `nyar-vm.rs` 重复实现 `legion.von` 的 `entry` 收集合同；manifest 校验属装配层。
- 本机开发时 `valkyrie.rs` 根 `Cargo.toml` `[patch]` 应指向 `../nyar-vm.rs`；改 emitter 后需在 `nyar-vm.rs` 验证再 `cargo build -p legion`。

### 3. `legions.von` 不能只注册 `core` + `std`

`projects/std/legion.von` 声明 `std.adaptor.clr`、`std.adaptor.wasm` 等为 **workspace 依赖**。leetcode 根 `legions.von`
若缺少 adaptor 超工作空间，会出现：

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

### 4. legion CLI 标志：用 `--target`，不是 `-t`

当前 Rust seed legion 的 build/test 使用长选项：

```text
legion build <project-dir> --target node -o .cache/<slug>-node
legion test <project-dir> --target node
```

`-t node` 会报 `unexpected argument '-t' found`。skills 里若仍写 `-t`，以 **本文件与 legion `--help`** 为准。

`node` 在规划器里映射为 `wasm32-node-unknown-wasm`（见 `valkyrie.rs` planner 测试）。

### 5. `legion test` ≠ 对 `metadata.tests` 验题意

| 机制                                        | 验什么                                                                               |
|---------------------------------------------|--------------------------------------------------------------------------------------|
| `run_python_solver.py` / `run_ts_solver.ts` | **题意**：`metadata.json` 全量 `tests`                                               |
| `legion build`                              | V 解能否编译、链接到 node/wasm 产物                                                  |
| `legion test`                               | 工程内 `[test]` 或 `test/` 目录中的 **V 单测**；无则 **0 通过、跳过**，exit 0 仍可能 |

leetcode **不**在 `solution.v` 里写 `[benchmark]`；也 **不必**为每题复制 `metadata.tests` 进 `[test]`，除非刻意加 V
侧单测。完备性矩阵默认探测 build + test 退出码（非 strict 下 test 为空可接受）；算法对错以 **题解**为准，三端实现须与题解一致并通过
`metadata.tests` / bench harness 校验。

### 6. 单题 `solvers/valkyrie/` 不在 workspace `members` 内是正常的

对题目目录执行 `legion build` 时，日志可能出现 `mode: package`、`未注册到 workspace members，已回退到 package 模式`
。只要祖先链上能发现 leetcode 根 `legions.von` 且 std 依赖可解析，通常 **仍可成功构建**。不要把「未注册为 member」误判为必须把每题
slug 写进 `legions.von`。

### 7. 刷题闭环各步的「完成」标准

| 步骤                | 常见误判                                                                                                                         |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------|
| ① coach `readme.md` | 把 LCD 旧稿（英文题面 + 难度标签行）当成已完成；须符合 `leetcode-coach`（中文、`## 问题` / `## 解答` / `## 复杂度分析`、无代码） |
| ② `solution.v`      | 文件存在但 **空文件** 或仅 `# 阻塞：` 即宣称「已实现」                                                                           |
| ③ 测 V              | 只跑 `legion build` 未对照题解或其它实现；或把 seed legion 与自举 legion 混用导致环境不一致                                      |
| ④ 演进              | 在 leetcode.v 内嵌 std 副本；应在 `valkyrie.v` / `valkyrie.rs` / `nyar-vm.rs`（按层）补能力后回到 ②③                                 |

### 8. 写 `solution.v` 时易错点（详见 `valkyrie-guide`）

- `ArrayList`： **逻辑 0-based** 用 `⁅i⁆`，勿把 LeetCode 下标直接套到 **`[i]`**（ordinal 1-based）。
- `i64` 异或：用 **`bit_xor`**；`^` 运算符主要在 `i32` 等类型上，勿照搬 TS 的 `^=`。
- `HashMap`：当前 std 提供 `HashMap::new(capacity)`、`insert` / `get`；勿假定存在 `from(iterator)` 等未实现构造器——缺 API 走
  `valkyrie-evolution` backlog，勿在题解里 hack。

### 9. 跑测前环境

- `projects/conformance` 需 `pnpm install` 后才有 `tsx` 等依赖；根目录 `pnpm test:problems` 会拉起 filter 包。
- Python 完备性跑测依赖本机 `python` 与题内 `pyproject.toml` 环境。

### 10. `metadata.tests` 大整数与 `null` 语义

- JSON 数字超过 $2^{53}-1$ 时， **生成/编辑 metadata 可能静默损坏**（如回文题 `1000000000000000000` 末位被抹平）；题解与实现算法正确仍会对不上
  `expected`。修复时以算法重算 `expected`，或改用字符串键存大整数（需 harness 同步）。
- `expected: null` 表示 **无返回值断言**（原地修改、无解等）。TS `void` 解得到 `undefined`，harness 在 `ts-ref.ts` 中归一为
  `null` 再比较。
- 无解数组题（如 `two-sum`）实现应返回 `null`，勿返回 `[]`，与 metadata 一致。
- `expected: "Error: …"` 表示 **应抛出异常**（如 `merge-sorted-array` 缓冲区不足）。Python harness 将 `Error: {message}` 与异常消息比对；TS 用 `ts-ref.assertTestCase` 同理。实现应在越界写入时抛错，勿在入口仅比较 `len(nums1) === m+n`（metadata 中常有 `len > m+n` 的有效用例）。

## Agent Skills（`.agents/skills/`）

| Skill                   | 用途                                                 |
|-------------------------|------------------------------------------------------|
| **`leetcode-practice`** | **刷题全流程**（编排下列四步，用户说刷题时先加载）   |
| `leetcode-coach`        | ① 单题 `readme.md` 教练稿（语言无关）                |
| `leetcode-implement`    | ② `solvers/` 三端实现与 `metadata.tests`             |
| `valkyrie-guide`        | ② 写 V 时：语法、下标、std、legion                   |
| `valkyrie-evolution`    | ④ 按缺口在 `../valkyrie.v` / `../valkyrie.rs` 补能力 |

**勿**在仓库根自建 `skills/` 或提交 `.cursor/skills/` 副本；`.cursor/` 仅作本机可选映射（已 gitignore）。
