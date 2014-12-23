# leetcode.v

LeetCode 题目在 **Valkyrie（V）** 与 **TypeScript** 上的完备性测试、外部产物基准与对比看板。

本仓收录大量 LeetCode 题目（`metadata.json` + 多语言求解器）。 **题解**（`readme.md`）为语言无关的 **参考实现**；Python、TS、V
三端实现须与题解一致，并用同一套 `metadata.tests` 校验，在看板中对比 TS 与 V 运行耗时。

## 依赖兄弟仓

与本仓并列放置（路径可用环境变量覆盖，勿写死盘符进题目内容）：

| 仓                              | 作用                                                                           |
|---------------------------------|--------------------------------------------------------------------------------|
| [`valkyrie.rs`](../valkyrie.rs) | `legion` CLI、`@valkyrie-language/vcc`、Wasm 编译与基准                        |
| [`valkyrie.v`](../valkyrie.v)   | V 语言 `core` / `std` / adaptors（`legions.von` 注册；**非** legion CLI 来源） |

首次克隆后建议：

```bash
pnpm install
pnpm link:valkyrie   # 将 vcc 链到本地 valkyrie.rs（按需）
```

## 标识符

| 术语           | 含义                                                                    |
|----------------|-------------------------------------------------------------------------|
| **slug**       | LeetCode URL 路径段；目录 `projects/problems/<slug>/`                   |
| **id**         | `metadata.json` / catalog 键、`LEETCODE_BENCH_ID`（现与 slug 同字符串） |
| **questionId** | LeetCode 数字题号（如 `#1`）                                            |

## 目录结构

```text
leetcode.v/
├── AGENTS.md                   # 工具无关代理入口
├── .agents/skills/             # practice（刷题全流程）+ coach / implement / guide / evolution
├── legions.von                 # V workspace：core + std + std.adaptors._（见 AGENTS.md）
├── projects/
│   ├── problems/<slug>/        # 单题（slug = 目录名 = LeetCode URL 段）
│   │   ├── metadata.json       # id、questionId、难度、标签、tests、invoke
│   │   ├── readme.md           # 教练稿（见 .agents/skills/leetcode-coach）
│   │   └── solvers/
│   │       ├── python/         # LCD 脚手架解（完备性跑测）
│   │       ├── typescript/     # 手写 TS 解
│   │       └── valkyrie/       # solution.v + legion.von
│   ├── conformance/            # @leetcode/conformance — 跑测与基准
│   └── dashboard/              # @leetcode/bench-dashboard — Vue 看板
└── scripts/                    # 格式化、批量限额、valkyrie 路径
```

## 快速开始

**环境**：Node.js ≥ 20，pnpm ≥ 10。

```bash
pnpm install
pnpm fmt:check        # Biome 格式检查
pnpm test:problems    # 完备性矩阵（默认批量限额 50 题）
pnpm bench                  # 跑全部已配置语言（默认 python + TS + V）
pnpm bench --count 10       # 最多 10 题
pnpm bench --id two-sum     # 单题
pnpm bench --lang ts,v      # 指定语言组合
pnpm bench:typescript       # 仅 TypeScript → benchmark-typescript.json
pnpm bench:valkyrie       # 仅 Valkyrie → benchmark-valkyrie.json
pnpm dashboard            # 启动看板 dev server
```

`pnpm bench --help` 查看完整 CLI。未在命令行指定的项仍可读环境变量（CI 兼容）。

| 变量                   | 说明                                 |
|------------------------|--------------------------------------|
| `VALKYRIE_RS_ROOT`     | 覆盖 `valkyrie.rs` 根路径            |
| `LEETCODE_BATCH_ALL=1` | 全量题目（等同 `--all`）             |
| `LEETCODE_BENCH_ID`    | 单题 id（等同 `--id`）               |

## 单题约定

- **题解**：`readme.md` 为参考实现（语言无关最优算法）；三端实现须与其一致。
- **Python**：`solvers/python/solution.py`，LCD 脚手架，完备性跑测用。
- **TypeScript**：`export class Solution`，方法名与 `invoke.typescript` 一致（如 `Solution().twoSum`）。
- **Valkyrie**：`solvers/valkyrie/solution.v` + `legion.von`（`entry: "solution.v"`，`core` / `std` 为 workspace 依赖，
  `target: node`）。

基准采用 **外部 harness**：`legion build` 产出 wasm + js glue；TS 对 `metadata.tests` 计时（`tsRuntimeMs`）。`pnpm bench` 对 V 侧只计 **编译**（`vCompileMs`），**不**调用 `legion bench` / `[benchmark]`；`vRuntimeMs` 待 wasm invoke harness 接线。

## 看板

`pnpm dashboard` 启动后合并读取 `benchmark-typescript.json` 与 `benchmark-valkyrie.json`（各语言可独立生成，缺一则只展示已有侧）。展示 TS 实现与 V 编译/运行耗时对比。

## 代理与题解规范

- 代理约定见 [`AGENTS.md`](AGENTS.md)。 **刷题** = [`leetcode-practice`](.agents/skills/leetcode-practice/SKILL.md)
  （题解 → 实现 → 测 V → 演进）。子 Skill：[`leetcode-coach`](.agents/skills/leetcode-coach/SKILL.md)、[
  `leetcode-implement`](.agents/skills/leetcode-implement/SKILL.md)、[
  `valkyrie-guide`](.agents/skills/valkyrie-guide/SKILL.md)、[
  `valkyrie-evolution`](.agents/skills/valkyrie-evolution/SKILL.md)（[Agent Skills](https://agentskills.io/specification)
  格式）。

## 许可证

[MPL-2.0](License.md)
