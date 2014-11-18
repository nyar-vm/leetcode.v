---
name: valkyrie-evolution
description: >-
  刷题流程第④步：上游补缺。完整刷题见 leetcode-practice。
  根据 leetcode.v 与题解实现暴露的缺口，在兄弟仓 valkyrie.v / valkyrie.rs 制定演进计划并落地。
  用户提及 V 缺能力、std 补全、编译器阻塞、valkyrie 上游、能力 backlog 时加载。
---

# Valkyrie Evolution

本 skill 管 **上游演进**：发现缺口 → 排优先级 → 在 `../valkyrie.v`（语言 + std）或 `../valkyrie.rs`（legion / vcc /
工具链）补能力 → 回到 leetcode.v 验证。

与 `leetcode-practice` 编排的四步中，本 skill 仅负责 **④ 演进**。不改 coach readme；③ 测不过且因 std/工具链时从 implement
转入此处。

## 何时使用

- `solution.v` 顶部 `# 阻塞：` 注释或 implement 无法仅用 phase-1 std 完成
- `legion build` / `legion test` 报语言或 std 缺失（非题解逻辑错误）
- 需要树、堆、链表、图、大 DP 等 **phase-1 外** 题型才能写 V 解
- 用户明确要求「完善 valkyrie」「补 std」「修编译器」

**不要**用本 skill 改 TS/Python 解或 readme 教练稿。

## 工作流（强制顺序）

```text
1. 采集缺口 → 写入/更新 capability-backlog.md
2. 分诊（语言 / std / 工具链）→ triage.md
3. 写切片计划（单切片可在一个会话内交付）→ plan-template.md
4. 上游实现 + 上游测试（valkyrie.v test 或 legion test）
5. 回到 leetcode.v：解除阻塞注释、补 solution.v、跑 conformance / bench
6. 勾选 backlog 项，更新 phase-1 能力表（若边界扩大）
```

## 缺口来源（采集）

| 来源         | 路径 / 命令                                            | 记录什么                     |
|--------------|--------------------------------------------------------|------------------------------|
| 题解阻塞注释 | `projects/problems/<slug>/solvers/valkyrie/solution.v` | 缺 API、缺语法、编译错误原文 |
| phase 边界   | `../leetcode-implement/.../v-phase1-capabilities.md`   | 暂缓题型对应的能力簇         |
| 完备性矩阵   | `pnpm test:problems`（V 列未绿）                       | slug + 失败阶段              |
| std 源码对照 | `../valkyrie.v/projects/std/source/`                   | 已有但未导出、仅有 stub      |
| 工具链       | `../valkyrie.rs`、`legion build` stderr                | vcc / legion 缺陷            |

只读 **已知 slug** 或 **限定子目录**；禁止 `**/*` 全仓 glob。

## 分诊与落仓

| 缺口类型                  | 主仓                                         | 典型动作                   |
|---------------------------|----------------------------------------------|----------------------------|
| 新容器 / 算法 API         | `valkyrie.v` `projects/std`                  | 实现 + `projects/std/test` |
| 原始类型 / 运算符 / trait | `valkyrie.v` `projects/core`                 | `core` 源 + 测试           |
| 命名空间 / prelude 导出   | `valkyrie.v` `legion.von`、`source/_prelude` | 注册与文档                 |
| 编译 / 链接 / Wasm        | `valkyrie.rs`                                | vcc、legion CLI            |
| JVM/CLR 宿主契约          | `valkyrie.v` `std.adaptors._`                | `host_provider` 与 adaptor |

详表见 [references/triage.md](references/triage.md)、[references/upstream-layout.md](references/upstream-layout.md)。

## 计划切片原则

- **一切片 = 一个可验证能力**（如「`BinaryHeap` 可 `push`/`pop` + 单测」），不要「一次性支持所有 LeetCode」。
- 每条计划须写： **动机（哪几题 / 哪条 backlog）**、 **验收测试**、 **是否破坏现有 API**。
- 优先 **leetcode 已 coach 且 TS/Python 已绿** 的题所需能力，避免为冷门 API 空转。
- std 新 API 遵循 `valkyrie-guide`：`std.collection` 单数命名空间、`#` / `<# #>` 注释、ordinal/cardinal 与 `ArrayList` 一致。

计划格式：[references/plan-template.md](references/plan-template.md)。

## 上游实现纪律

1. **权威在兄弟仓**：编辑 `E:/victory 胜利女神/valkyrie.v` 或 `valkyrie.rs`，不在 leetcode.v 复制 std 源码。
2. **测试跟能力走**：新 API 必须有 `projects/std/test/` 或 `projects/core/test/` 对应用例；禁止只改实现不补测。
3. **最小公开面**：先满足题解所需签名；泛化与性能优化放后续切片。
4. **中文注释**说明非显然不变式；commit 在对应上游仓，gitmoji + 英文 subject。
5. 改完在 leetcode.v 根确认 `legions.von` 仍指向本地 `../valkyrie.v`（`pnpm link:valkyrie` 按需）。

## 与 leetcode.v 的闭环

```text
valkyrie-evolution（上游） → leetcode-implement（solution.v） → conformance / bench
         ↑___________________________________________|
                    仍失败则回到 backlog
```

解除阻塞时：删除 `solution.v` 顶部 `# 阻塞：` 行，实现与 coach 一致的最优解，并跑：

```text
legion build projects/problems/<slug>/solvers/valkyrie --target node
python projects/conformance/scripts/run_python_solver.py projects/problems/<slug>   # 对照
node --import tsx projects/conformance/scripts/run_ts_solver.ts projects/problems/<slug>
```

## 检查清单

- [ ] backlog 项有 **slug 或测试命令** 可追溯
- [ ] 计划含验收标准与目标文件路径（上游仓内）
- [ ] 上游 PR/commit 含测试
- [ ] leetcode.v 至少一题 V 解从阻塞变为可编译/可跑（或明确记录仍缺工具链）
- [ ] `v-phase1-capabilities.md` 或 backlog 状态已更新

## 参考

- [references/type-taxonomy.md](references/type-taxonomy.md) — `unite` / `union` / `A|B` 三分法
- [references/capability-backlog.md](references/capability-backlog.md) — 活 backlog
- [references/plan-template.md](references/plan-template.md)
- [references/triage.md](references/triage.md)
- [references/upstream-layout.md](references/upstream-layout.md)
- 用法：`../valkyrie-guide/SKILL.md`
- 题解：`../leetcode-implement/SKILL.md`
