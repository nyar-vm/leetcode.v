# SXO 能力 backlog（leetcode 驱动）

活文档：由 `sxo-evolution` 维护。状态：`open` | `planned` | `upstream` | `done` | `wont`。

| ID | 能力簇 | 状态 | 动机（题 / 场景） | 上游落点 | 备注 |
|----|--------|------|-------------------|----------|------|
| S-001 | leetcode conformance harness（Wolfram / MATLAB sxo） | done | batch 公平对比、看板 **(Sxo)** 列 | `leetcode.v` `conformance` + `@sxo/*` | `HostSession` load → bind → invoke；`bench:wolfram-sxo` / `bench:matlab-sxo` |
| S-002 | harness JSON ↔ `TermId`（N-API 边界） | done | `metadata.tests` 标量、null、一维 `number[]` | `sxo-napi` `json.rs` + `HostSession` | **主契约**：`bindJson` / `termToJson`；`sxo-json.ts` 仅表面显示，**不再**用于测例实参 |
| S-003 | 数组 Part / 下标读取 | partial | `two-sum` | `@sxo/mathematica` | `{3,3}[[1]]` → `3`、`Length[{3,3}]` → `2` 可用 |
| S-004 | 循环与早退（Medium 题骨架） | partial | 双指针、嵌套扫描 | `SemanticOperator::Max`/`Min` + dialect | Wolfram `container-with-most-water` 全测例绿；MATLAB 仍受 S-011 `while` 阻塞 |
| S-005 | Windows native optional dep 一键可装 | open | 本机 bench CI | `@sxo/sxo-win32-x64` | 与 `loadNative()` 诊断对齐 |
| S-006 | Wolfram `Module` + 嵌套 `Do` + `Return` 早退 | done | `two-sum` | `@sxo/mathematica` / `sxo-dialect-mathematica` | `two-sum` 全测例绿（HostSession + 本地 native） |
| S-007 | Wolfram 嵌套 `Table` / `Flatten` 配对枚举 | open | `two-sum` 备选扫描 | Athena VM | `ATHENA_UNSUPPORTED_OPERATION` op=234 |
| S-008 | MATLAB `function` 内嵌套 `for` + `return` | done | `two-sum` | `@sxo/matlab` / `sxo-dialect-matlab` | `two-sum` 全测例绿 |
| S-009 | Wolfram `:=` 用户函数在 harness 单次 evaluate 中求值为 `Null` | partial | `reverse-integer`、`palindrome-number` | `@sxo/mathematica` | `two-sum` 已绿；标量 `While` 题仍 `ATHENA_UNSUPPORTED_OPERATION` |
| S-010 | 字符串 `Characters` / `StringTake` / `strlength` | open | `longest-common-prefix`、`valid-parentheses` | `@sxo/mathematica` / `@sxo/matlab` | 字符级 Part 与拼接 |
| S-011 | MATLAB 用户 `function` 体（含 `while`） | open | 标量 / 数组题 | `@sxo/matlab` | `reverse-integer` 等仍 `error node` |
| S-012 | 链表（数组模拟下标） | open | `add-two-numbers` 等 | dialect | batch 多题 `term_not_json_surface` 或求值未绿 |
| S-013 | 排序 + 多指针 | open | `3sum`、`container-with-most-water` | `@sxo/*` | `Sort` / `sort` + 双指针 |
| S-014 | 二维矩阵 | open | `rotate-image`、`valid-sudoku` | dialect | 矩阵下标与变异 |
| S-015 | 回溯 / 递归 DFS | open | `generate-parentheses` 等 | Athena VM | 深度与组合枚举 |
| S-016 | 哈希 / `Association` / `containers.Map` | open | `roman-to-integer`、`group-anagrams` | frontend | 映射构造与查表 |
| S-017 | 正则 / 通配 / DP 表 | open | `regular-expression-matching` 等 | dialect | Hard 题簇 |
| S-018 | harness `termToJson` 结果投影 | partial | 多数 batch 题 | `sxo-napi` `json.rs` | 错误细分 `unevaluated_application`；根因多为上游未求值，非 JSON 类型缺失 |

## 批量补题 Gap 报告

catalog 前 N 题批量写入 `solvers/wolfram-sxo` / `matlab-sxo` 后，逐题 conformance 结果见：

**`projects/conformance/reports/sxo-batch-gap.md`**

生成：`node scripts/sxo-batch-rollout.mjs`（默认 N=50，可用 `LEETCODE_BATCH_LIMIT` 覆盖）。本地需 `pnpm run link:sxo` + `sxo-framework` `pnpm run build:native`。

最新（2026-09-25）：catalog 前 50 题 **Wolfram 2 / MATLAB 1 全绿**（`two-sum`、`container-with-most-water`）。

## 看板与 bench

1. **快照过期**：`benchmark-wolfram-sxo.json` / `benchmark-matlab-sxo.json` 在 `@sxo/*` 未安装或旧版时 `rows: []`。npm **≥ 含 `HostSession` 的版本** 后重跑 `LEETCODE_BENCH_LANG=wolfram-sxo,matlab-sxo pnpm bench`。
2. **能力扩面**：`two-sum` 已可作 **Wolfram (Sxo) / MATLAB (Sxo)** 有效样本；其余题见 gap 表（多为 S-010–S-018，非 harness 拼接问题）。
3. **与 Python/TS 批次无关**：batch-20 只保证三端 LCD/TS 解；sxo 需逐题补 `solution.wl` / `solution.m` 且上游能力绿。

## 复现锚点：`two-sum`（HostSession harness）

环境：`leetcode.v` 根 `pnpm install`（或 `link:sxo` + `build:native`），`projects/conformance`：

```text
node --import tsx projects/conformance/scripts/run_wolfram_sxo_solver.ts projects/problems/two-sum
node --import tsx projects/conformance/scripts/run_matlab_sxo_solver.ts projects/problems/two-sum
# 各 80 测例全绿
```

Harness 路径（无程序拼接）：

1. `evaluateDefinition(solution.wl / solution.m)`
2. `bindJson('nums', …)` / `bindJson('target', …)` — JSON → arena `TermId`
3. `invoke('twoSum', ['nums','target'])` — 仅符号表面调用
4. `termToJson(result)` — 断言

题解算法见 `projects/problems/two-sum/solvers/*/solution.*`（coach 双层循环，**勿为过关改算法**）。

### 已关闭（原 S-006 / S-008 最小复现）

旧版「整段 `evaluate` 拼接 + 字面量数组」在 n≥17 时触发 `ConstructCollection` 宽度问题；现由 **JSON bind + `StoreResidualTerm`** 与 Athena **`LoadTerm` 物化集合** 解决。勿再通过抬高 `MAX_HOST_ARGS` 绕过。

### S-007 — Wolfram `Table` / `Flatten`（仍 open）

```text
Flatten[Table[{i-1,j-1},{i,1,2},{j,2,2}],1]
→ ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execute_ir_request, op=234, reason=vm_backend_failed_no_fallback}
```

## 上游验收标准（切片完成后）

1. `two-sum`：`metadata.tests` 全绿（**已达成**）。
2. **`two-sum` bench 已绿**：Wolfram ~13.6s / MATLAB ~13.9s 每轮（80 测例）；`SXO_BENCH_PARAMS` 10 迭代 + 2 warmup，stderr 有 `[sxo-bench]` 进度。
3. 看板 **语言综合成绩** 中 Wolfram (Sxo) / MATLAB (Sxo) **有效样本 ≥ 1**（**已具备 `two-sum`**，随题解扩面再涨）。

## 新增条目模板

```markdown
| S-0xx | 简短名 | open | <slug> 或 matrix case | @sxo/<pkg> 或 dialect 路径 | 阻塞原文 |
```

## 标签约定

- 看板、bench JSON、`RUNTIME_LANGUAGES`：**Wolfram (Sxo)**、**MATLAB (Sxo)**（`@sxo/*` npm 包名仍小写）
- 文档说明：SXO frontend，**不是** Wolfram Engine / MATLAB Runtime
