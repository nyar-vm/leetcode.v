# SXO 缺口分诊

## 快速判断

| 症状 | 类型 | 先查 |
|------|------|------|
| 源码字符串不被接受 | parse / frontend | `@sxo/mathematica` 或 `@sxo/matlab` parse + feature matrix |
| parse 成功，evaluate 抛诊断 | lowering / Athena | matrix `eval` case、`Expression.diagnostics` |
| 结果串与 `metadata.expected` 不一致 | 渲染或语义 | `toWolfram()` / `toMatlab()` vs 题意；先确认非 JSON 类型损坏 |
| `loadNative` / optional dep 失败 | native 宿主 | Node 版本、OS/arch、`@sxo/sxo-*` 是否安装 |
| Python/TS 绿，仅 SXO 红 | **方言能力**（本 skill） | backlog + matrix |
| 三端都红 | **题解**（非本 skill） | `leetcode-implement`、metadata |

## feature matrix 状态

| 状态 | 含义 | leetcode 动作 |
|------|------|---------------|
| `supported` | 可 evaluate | 写单脚本解 |
| `partial` | 子集可用 | 题解降级或 upstream 切片 |
| `parse-only` | 仅迁移分析 | 勿当 runtime 门禁 |
| `unsupported` | 明确不支持 | backlog → sxo-evolution |
| `unavailable` | 缺 native 宿主 | 修平台包或标环境 missing |

## 优先级（默认）

1. 解锁 **coach + Python/TS 已绿** 且 **单脚本已写** 的题
2. 解锁 **同一构造簇** 的多题（如数组索引、循环、列表）
3. native 加载失败导致 **整语言** 无样本
4. 单题冷门构造

## 禁止

- 在 leetcode 题内 vendoring `@sxo/*` 或要求用户安装 Wolfram Engine / MATLAB
- 把 LCD 越界用例（`Execution timed out`、超题面约束输入）当成 SXO bug
- 用 `asMetadataValue` 式类型强转绕过断言（应对齐 metadata 字符串语义）
