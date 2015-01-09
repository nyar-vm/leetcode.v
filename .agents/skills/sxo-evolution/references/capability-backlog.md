# SXO 能力 backlog（leetcode 驱动）

活文档：由 `sxo-evolution` 维护。状态：`open` | `planned` | `upstream` | `done` | `wont`。

| ID | 能力簇 | 状态 | 动机（题 / 场景） | 上游落点 | 备注 |
|----|--------|------|-------------------|----------|------|
| S-001 | leetcode conformance harness（Wolfram / MATLAB sxo） | done | batch 公平对比、看板 **(sxo)** 列 | `leetcode.v` `conformance` + `@sxo/*` | `run_*_sxo_solver.ts`、`bench:wolfram-sxo` / `bench:matlab-sxo` |
| S-002 | `metadata.invoke` 与 JSON expected 互操作 | open | 数组、字符串、null、大整数 | leetcode harness 编解码 | 禁止 JS number 静默损坏 |
| S-003 | 数组 / 列表构造（LeetCode 批量题） | open | 两数之和类、多返回值 | matrix + `@sxo/matlab` / `@sxo/mathematica` | 对照 TS `number[]` |
| S-004 | 循环与分支（Medium 题） | open | 双指针、扫描类 | dialect lowering | 先 matrix 再 leetcode |
| S-005 | Windows native optional dep 一键可装 | open | 本机 bench CI | `@sxo/sxo-win32-x64` | 与 `loadNative()` 诊断对齐 |

## 新增条目模板

```markdown
| S-0xx | 简短名 | open | <slug> 或 matrix case | @sxo/<pkg> 或 dialect 路径 | 阻塞原文 |
```

## 标签约定

- 看板、bench JSON、`RUNTIME_LANGUAGES`：**Wolfram (sxo)**、**MATLAB (sxo)**
- 文档说明：SXO frontend，**不是** Wolfram Engine / MATLAB Runtime
