---
name: sxo-evolution
description: >-
  刷题流程第④步（SXO 方言）：上游补缺。完整刷题见 leetcode-practice。
  根据 leetcode.v 与 Wolfram (Sxo) / MATLAB (Sxo) 实现暴露的缺口，在兄弟仓 sxo-framework
  （@sxo/mathematica、@sxo/matlab 等 npm 包）制定演进计划并落地。
  用户提及 Wolfram (Sxo)、MATLAB (Sxo)、@sxo 缺能力、方言 frontend、feature matrix 时加载。
---

# SXO Evolution

本 skill 管 **SXO 方言上游演进**：发现缺口 → 排优先级 → 在 **sxo-framework** 补 frontend / lowering /
Athena 能力 → 回到 leetcode.v 验证。

与 `leetcode-practice` 四步中，本 skill 负责 **④ 演进（SXO 分支）**。不改 coach readme；② 中
`solution.wl` / `solution.m` 因 **@sxo/* 能力不足** 无法通过 `metadata.tests` 时转入此处。

**不是** Wolfram Engine / MATLAB 运行时演进；看板与文档一律标 **Wolfram (Sxo)**、**MATLAB (Sxo)**。

## 何时使用

- `solvers/wolfram-sxo/` 或 `solvers/matlab-sxo/` 顶行 `# 阻塞：`，或 conformance 报 dialect / evaluate 失败
- `@sxo/mathematica` / `@sxo/matlab` 的 `parse` 成功但 `evaluate` / `toWolfram` / `toMatlab` 与 `metadata.expected` 不一致
- feature matrix 为 `partial` / `unsupported`，而 coach 算法依赖该构造
- 用户明确要求「补 @sxo」「修 Wolfram frontend」「修 MATLAB dialect」

**不要**用本 skill 改 TS/Python/V 解、readme，或把缺口 hack 进单题脚本。

## 工作流（强制顺序）

```text
1. 采集缺口 → 写入/更新 capability-backlog.md
2. 分诊（parse / lower / evaluate / native 宿主）→ triage.md
3. 写切片计划 → plan-template.md
4. 上游实现 + @sxo/* 测试（vitest / feature-matrix）
5. 回到 leetcode.v：解除阻塞、单脚本解、跑 conformance / bench
6. 勾选 backlog；必要时更新 dialect feature 报告
```

## 缺口来源（采集）

| 来源           | 路径 / 命令                                      | 记录什么                          |
|----------------|--------------------------------------------------|-----------------------------------|
| 题解阻塞注释   | `solvers/wolfram-sxo/solution.wl`、`matlab-sxo/` | 缺构造、evaluate 诊断、expected 差 |
| conformance    | `run_*_sxo_solver`（接线后）                     | slug + 失败测例 + 渲染串         |
| feature matrix | `pnpm --filter @sxo/mathematica report:features` | 构造名 + status                  |
| npm API        | `@sxo/mathematica` / `@sxo/matlab` README        | parse-only vs supported 边界      |
| native 宿主    | optional `@sxo/sxo-*` 加载失败                   | Node/OS/arch、loadNative 栈       |

只读 **已知 slug** 或 **sxo-framework 限定子目录**；禁止 leetcode `**/*` 全仓 glob。

## 分诊与落仓

| 缺口类型              | 主落点（sxo-framework）                    | 典型动作                          |
|-----------------------|--------------------------------------------|-----------------------------------|
| Wolfram 语法 / 渲染   | `projects/packages/sxo-mathematica`        | TS frontend + vitest              |
| MATLAB 语法 / 渲染    | `projects/packages/sxo-matlab`             | TS frontend + vitest              |
| 共享求值 / simplify   | Athena（经 native）                          | dialect lowering + 引擎测试       |
| Wolfram lowering      | `projects/dialects/sxo-dialect-mathematica`  | Rust + matrix case                |
| MATLAB lowering       | `projects/dialects/sxo-dialect-matlab`     | Rust + matrix case                |
| NAPI / 平台包         | `projects/platforms/native`                | `@sxo/sxo-win32-x64` 等           |

leetcode **消费** npm 包；优先改 **已发布面包**（`@sxo/mathematica`、`@sxo/matlab`、`@sxo/core`），Rust dialect 仅在 lowering/求值语义缺口时动。详表见 [references/triage.md](references/triage.md)、[references/upstream-layout.md](references/upstream-layout.md)。

## 计划切片原则

- **一切片 = 一个可验证构造或 API**（如「MATLAB `1:n` 在 evaluate 路径 supported」），不要「一次覆盖全部 LeetCode」。
- 每条计划须写：**动机（哪几题 / backlog ID）**、**feature matrix 状态变化**、**leetcode 单题验收命令**。
- 优先 **已有 coach + Python/TS 绿** 的题所需 SXO 能力。
- 题内求解器 **仅单脚本**，无 `pyproject.toml` / 题级 `package.json`；依赖由 leetcode `conformance` 根 manifest 声明 `@sxo/*`。

计划格式：[references/plan-template.md](references/plan-template.md)。

## 上游实现纪律

1. **权威在 sxo-framework**：编辑兄弟仓 npm 包与测试；不在 leetcode.v 复制 `@sxo/*` 源码。
2. **测试跟能力走**：改 frontend 须补 `tests/` 或 feature-matrix case；禁止只改实现不补测。
3. **最小公开面**：先满足 leetcode 单题 `metadata.tests`；泛化放后续切片。
4. **标签诚实**：文档与看板写 **Wolfram (Sxo)** / **MATLAB (Sxo)**（括号内 **Sxo** 大写 S），不写「Mathematica 兼容」「MATLAB 替代」。
5. commit 在 **sxo-framework** 仓，gitmoji + 英文 subject；leetcode 侧只解除阻塞与 harness 接线。

## 与 leetcode.v 的闭环

```text
sxo-evolution（上游 npm/native） → leetcode-implement（单脚本解） → conformance / bench
              ↑__________________________________________________|
                         仍失败则回到 backlog
```

解除阻塞后跑（harness 就绪后）：

```text
node --import tsx projects/conformance/scripts/run_wolfram_sxo_solver.ts projects/problems/<slug>
node --import tsx projects/conformance/scripts/run_matlab_sxo_solver.ts projects/problems/<slug>
```

对照 Python / TypeScript 同一 `metadata.tests`。

## 检查清单

- [ ] backlog 项有 **slug 或 matrix case** 可追溯
- [ ] 计划含验收：上游 vitest + leetcode 单题
- [ ] 看板语言名含 **(Sxo)** 后缀
- [ ] 未把官方 Wolfram Engine / MATLAB Runtime 误当作依赖

## 参考

- [references/capability-backlog.md](references/capability-backlog.md)
- [references/plan-template.md](references/plan-template.md)
- [references/triage.md](references/triage.md)
- [references/upstream-layout.md](references/upstream-layout.md)
- 题内实现：`../leetcode-implement/SKILL.md`
- V 上游（独立链）：`../valkyrie-evolution/SKILL.md`
