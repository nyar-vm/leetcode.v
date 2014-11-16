---
name: leetcode-practice
description: >-
  leetcode.v 单题刷题全流程：教练稿 → 三端实现 → 验证 Valkyrie → 缺能力则上游演进。
  用户说刷题、做一题、推进某 slug、单题闭环时加载本 skill，再按需加载子 skill。
---

# LeetCode Practice（刷题全流程）

在本仓， **刷题** 指对 `projects/problems/<slug>/` 的 **完整闭环**，不是只写 readme 或只写某一语言。

```text
① 写题解（coach）  →  ② 写实现（solvers）  →  ③ 测 Valkyrie  →  ④ 演进（若缺能力）
      leetcode-coach      leetcode-implement       本节步骤 3          valkyrie-evolution
                          + valkyrie-guide（V）
```

任一步未通过 **不得** 宣称该题「刷完」；③ 失败且因语言/std 缺口时进入 ④，完成后 **回到 ②③** 直至 V 可编译且测例通过（或
backlog 记 `wont` 并说明）。

## 前置

- 已知 **slug**（目录名）；只读 `projects/problems/<slug>/`，禁止无界 glob。
- `metadata.json` 与 `tests` 已存在（LCD 脚手架题通常已有）。

## ① 写题解

**Skill**：`leetcode-coach`

**产出**：`readme.md`（语言无关教练稿）

**完成标准**：

- 含 `## 问题`、`## 解答`（由浅入深、具名瓶颈/优化）、`## 复杂度分析`
- 无代码、无语言名、无 `solvers` / `invoke`

## ② 写实现

**Skill**：`leetcode-implement`；写 `solution.v` 时加载 `valkyrie-guide`

**产出**：

```text
solvers/python/solution.py
solvers/typescript/solution.ts
solvers/valkyrie/solution.v + legion.von
```

**完成标准**：

- 三端算法与 readme **最终优化** 同阶同语义
- Python / TS 对本机 `metadata.tests` 全绿
- V：可 `legion build`；若 std 不够，在 `solution.v` 顶行 `# 阻塞：<摘要>` 并 **进入 ④**（勿用题解 hack 绕过）

**命令（单题）**：

```text
python projects/conformance/scripts/run_python_solver.py projects/problems/<slug>
node --import tsx projects/conformance/scripts/run_ts_solver.ts projects/problems/<slug>
legion build projects/problems/<slug>/solvers/valkyrie --target node -o .cache/<slug>-node
```

## ③ 测 Valkyrie 是否正常

区分 **题解错了** 与 **工具链/std 坏了**（见 `valkyrie-evolution/references/triage.md`）。

**必做**：

1. `legion build …/solvers/valkyrie --target node` 成功
2. 对 **metadata.tests** 跑 V（harness / `legion test`，环境允许时）
3. （可选）`LEETCODE_BENCH_ID=<slug> pnpm bench` 对比 TS 与 V 耗时

**通过**：V 与 TS/Python 同测例结果一致，且无未解释的编译/链接错误。

**未通过**：

| 现象                  | 下一步                   |
|-----------------------|--------------------------|
| 算法 / 边界错         | 回 ②，不改上游           |
| 缺类型、语法、std API | ④ `valkyrie-evolution`   |
| legion / vcc 报错     | ④，落点 `../valkyrie.rs` |

## ④ Valkyrie 演进

**Skill**：`valkyrie-evolution`

**产出**：兄弟仓 `../valkyrie.v` / `../valkyrie.rs` 补丁 + 更新 `capability-backlog.md`

**完成标准**：

- 上游有测试；leetcode 侧去掉 `# 阻塞：`，`solution.v` 与 coach 一致
- 重复 ③ 直至通过

## 单题检查清单

- [ ] ① `readme.md` 符合 coach 规范
- [ ] ② Python + TS `metadata.tests` 全绿
- [ ] ② V 源码与 `legion.von` 就绪
- [ ] ③ `legion build --target node` 通过
- [ ] ③ V 测例与题解一致（与其它实现对齐）
- [ ] ④（若曾阻塞）backlog 项已 `done` 或 `wont`

## 子 Skill 索引

| 步骤 | Skill                                  |
|------|----------------------------------------|
| ①    | `leetcode-coach`                       |
| ②    | `leetcode-implement`、`valkyrie-guide` |
| ③    | 本 skill §③ + `AGENTS.md` 基准节       |
| ④    | `valkyrie-evolution`                   |
