---
name: leetcode-implement
description: >-
  刷题流程第②步：三端求解器。完整刷题见 leetcode-practice。
  实现 leetcode.v 三端求解器：Python、TypeScript、Valkyrie solution.v。
  算法须与题解（readme 参考实现）一致，通过 metadata.tests。用户提及实现、solver、
  TS、V、Python 对齐题解时加载。
---

# LeetCode Implement（solvers）

在 **coach readme 已定稿** 后实现三端求解器。算法语义与 `projects/problems/<slug>/readme.md` 最终算法一致。

## 与 coach 的分工

| 产物         | Skill            | 内容         |
|--------------|------------------|--------------|
| `readme.md`  | `leetcode-coach` | 语言无关思路 |
| `solvers/**` | **本 skill**     | 可执行代码   |

## 目录

```text
projects/problems/<slug>/solvers/
├── python/solution.py         # LCD 脚手架 + class Solution
├── typescript/solution.ts     # export class Solution
├── wolfram-sxo/solution.wl    # 单脚本，无 package.json
├── matlab-sxo/solution.m      # 单脚本，无 package.json
└── valkyrie/
    ├── legion.von
    └── solution.v
```

## 权威校验

1. 同目录 `readme.md` — **参考实现**（最优算法；实现不得回退到题解已否定的次优解）
2. `metadata.json` — `invoke.python` / `invoke.typescript`、`tests`
3. 跑测：
    - Python：`python projects/conformance/scripts/run_python_solver.py <problem-dir>`
    - TS (Node)：`node --import tsx projects/conformance/scripts/run_ts_solver.ts <problem-dir>`
    - TS (Bun)：`projects/conformance` 下 `bun scripts/run_bun_solver.ts <problem-dir>`（复用同一 `solution.ts`）
    - V：`legion build` / `legion test` on `solvers/valkyrie/`（本地 legion 就绪时）

只读当前 `<slug>` 目录，禁止 `**/*` glob。

## Python

- **只改** `class Solution` 内方法；保留文件顶部 LCD 脚手架（勿删）。
- 与 coach 一致的最优复杂度；禁止 `sorted` + 暴力替代已写的哈希/线性解。
- 方法签名与 `invoke.python` 一致（如 `Solution().twoSum`）。

## TypeScript

- 单文件 `solution.ts`：`export class Solution { ... }`
- 方法名与 `invoke.typescript` 一致；参数顺序与 `metadata.tests[].args` 键序一致（`Object.values(args)`）。
- **Node**：`run_ts_solver.ts`（`tsx`）。**Bun**：`run_bun_solver.ts` 复用同一文件与 `invoke.typescript`，看板列 **TypeScript (Bun)**。
- harness 经 `fn.call(instance, …)` 调用，`this` 指向 `Solution` 实例；可用 `private` 辅助方法。
- 不写测试 harness、不引 conformance 包。

## Wolfram (Sxo) / MATLAB (Sxo)

- **仅单文件**：`solution.wl` / `solution.m`；**禁止**题级 `package.json`。`@sxo/*` 由 `projects/conformance` 统一声明。
- `metadata.invoke.wolframSxo` / `matlabSxo`：函数名（如 `twoSum`），非 `Solution().twoSum`。
- 参数顺序与 `metadata.tests[].args` 键序一致；无解返回须与 metadata 一致（`null` 而非 `[]`，Wolfram 侧 harness 解析 `Null`）。
- 缺 `@sxo/*` 能力：首行 `# 阻塞：` / `% 阻塞：` + 加载 **`sxo-evolution`**。

## Valkyrie

**写 `solution.v` 前加载** `.agents/skills/valkyrie-guide/SKILL.md`（下标 ordinal/cardinal、std 命名空间、legion 布局）。

- 算法与 coach 一致；phase-1 题型见 `references/v-phase1-capabilities.md`。
- 与 LeetCode 对齐的逻辑下标用 `ArrayList` 的 **`⁅i⁆`（0-based cardinal）**，勿把 `[i]` 当 0-based。
- 无 `[benchmark]`；正确性靠外部 harness / `legion test`。
- 若 std 暂缺能力，在 `solution.v` 顶部用 `# 阻塞：<能力摘要>` 注释（勿用 `//`），并加载 **`valkyrie-evolution`** 记入
  backlog、排上游切片。

## 检查清单

- [ ] 三端算法与 coach **最终算法** 同阶同语义
- [ ] Python / TS 对本机 `metadata.tests` 全绿
- [ ] 未在 readme 写代码或语言名（coach 规则不变）
- [ ] V 至少 `legion build --target node` 可尝试（环境允许时）

## 参考

- 标杆：`projects/problems/two-sum/solvers/`
- V 语言：`../valkyrie-guide/SKILL.md`
- V 上游补缺：`../valkyrie-evolution/SKILL.md`
- SXO 上游补缺：`../sxo-evolution/SKILL.md`
- V phase-1 题型：`references/v-phase1-capabilities.md`
