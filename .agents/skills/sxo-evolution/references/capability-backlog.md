# SXO 能力 backlog（leetcode 驱动）

活文档：由 `sxo-evolution` 维护。状态：`open` | `planned` | `upstream` | `done` | `wont`。

| ID | 能力簇 | 状态 | 动机（题 / 场景） | 上游落点 | 备注 |
|----|--------|------|-------------------|----------|------|
| S-001 | leetcode conformance harness（Wolfram / MATLAB sxo） | done | batch 公平对比、看板 **(Sxo)** 列 | `leetcode.v` `conformance` + `@sxo/*` | `run_*_sxo_solver.ts`、`bench:wolfram-sxo` / `bench:matlab-sxo` |
| S-002 | harness JSON ↔ 表面语法编解码 | open | `metadata.tests` 数组、null、字符串 | `leetcode.v` `sxo-json.ts` | 已覆盖标量与一维 `number[]`；大整数仍受 JS 限制 |
| S-003 | 数组 Part / 下标读取 | partial | `two-sum` | `@sxo/mathematica` | `{3,3}[[1]]` → `3`、`Length[{3,3}]` → `2` 可用 |
| S-004 | 循环与早退（Medium 题骨架） | open | 双指针、嵌套扫描 | dialect lowering + matrix | 见 S-006–S-008 |
| S-005 | Windows native optional dep 一键可装 | open | 本机 bench CI | `@sxo/sxo-win32-x64` | 与 `loadNative()` 诊断对齐 |
| S-006 | Wolfram `Module` + 嵌套 `Do` + `Return` 早退 | open | `two-sum` | `@sxo/mathematica` / `sxo-dialect-mathematica` | 见下方复现；算法不改，题解保留 coach 双层循环 |
| S-007 | Wolfram 嵌套 `Table` / `Flatten` 配对枚举 | open | `two-sum` 备选扫描 | Athena VM | `ATHENA_UNSUPPORTED_OPERATION` op=234 |
| S-008 | MATLAB `function` 内嵌套 `for` + `return` | open | `two-sum` | `@sxo/matlab` / `sxo-dialect-matlab` | `matlab(oak): error node`；算法不改 |
| S-009 | Wolfram `:=` 用户函数在 harness 单次 evaluate 中求值为 `Null` | open | `palindrome-number`、`reverse-integer` 等标量题 | `@sxo/mathematica` | `IntegerDigits`/`While` 定义后调用仍 `Null` |
| S-010 | 字符串 `Characters` / `StringTake` / `strlength` | open | `longest-common-prefix`、`valid-parentheses` | `@sxo/mathematica` / `@sxo/matlab` | 字符级 Part 与拼接 |
| S-011 | MATLAB 用户 `function` 体（含 `while`） | open | 标量 / 数组题 | `@sxo/matlab` | 脚本级 `while` 可用，函数体内 `error node` |
| S-012 | 链表（数组模拟下标） | open | `add-two-numbers` 等 | dialect | 与 S-006/S-008 叠加 |
| S-013 | 排序 + 多指针 | open | `3sum`、`container-with-most-water` | `@sxo/*` | `Sort` / `sort` + 双指针 |
| S-014 | 二维矩阵 | open | `rotate-image`、`valid-sudoku` | dialect | 矩阵下标与变异 |
| S-015 | 回溯 / 递归 DFS | open | `generate-parentheses` 等 | Athena VM | 深度与组合枚举 |
| S-016 | 哈希 / `Association` / `containers.Map` | open | `roman-to-integer`、`group-anagrams` | frontend | 映射构造与查表 |
| S-017 | 正则 / 通配 / DP 表 | open | `regular-expression-matching` 等 | dialect | Hard 题簇 |

## 批量补题 Gap 报告

catalog 前 N 题批量写入 `solvers/wolfram-sxo` / `matlab-sxo` 后，逐题 conformance 结果见：

**`projects/conformance/reports/sxo-batch-gap.md`**

生成：`node scripts/sxo-batch-rollout.mjs`（默认 N=50，可用 `LEETCODE_BATCH_LIMIT` 覆盖）。

## 看板为 0 的原因（非 harness 缺陷）

1. **快照过期**：`benchmark-wolfram-sxo.json` / `benchmark-matlab-sxo.json` 在 `@sxo/*` 尚未 `pnpm install` 时生成，`rows: []`、`ready: false`。npm 就绪后须重跑 `LEETCODE_BENCH_LANG=wolfram-sxo,matlab-sxo pnpm bench`。
2. **题解被能力阻塞**：目前仅 `two-sum` 有 sxo 脚本；在 S-006–S-008 未解决前 conformance 失败，bench 无有效 `runtimeMs`。
3. **与 Python/TS 批次无关**：batch-20 只保证三端 LCD/TS 解；sxo 需逐题补 `solution.wl` / `solution.m` 且上游能力绿。

## 复现锚点：`two-sum`（`@sxo/mathematica` 0.0.6 / `@sxo/matlab` 0.0.6）

环境：`leetcode.v` 根 `pnpm install` 后，在 `projects/conformance` 执行。

### S-006 — Wolfram `Do` / `Return`

题解（`projects/problems/two-sum/solvers/wolfram-sxo/solution.wl`，**勿改算法**）：

```wolfram
twoSum[nums_, target_] := Module[{n = Length[nums]},
  Do[
    Do[
      If[nums[[i]] + nums[[j]] == target, Return[{i - 1, j - 1}]],
      {j, i + 1, n}
    ],
    {i, 1, n - 1}
  ];
  Null
]
```

```text
node --import tsx projects/conformance/scripts/run_wolfram_sxo_solver.ts projects/problems/two-sum
# tests[0]: expected [0,1], got null
```

最小 evaluate（`Mathematica.create({ autoSimplify: false })`）：

```text
输入：{solution 全文}

twoSum[{3, 3}, 6]
实际：Null
期望：{0, 1}
```

已确认**可用**的邻近构造（同包、同 `autoSimplify: false`）：

| 输入 | 输出 |
|------|------|
| `Length[{3,3}]` | `2` |
| `{3,3}[[1]]` | `3` |
| `Module[{n=2}, n]` | `2` |
| `Table[i,{i,1,3}]` | `{1, 2, 3}` |

### S-007 — Wolfram `Table` / `Flatten`

```text
Flatten[Table[{i-1,j-1},{i,1,2},{j,2,2}],1]
→ ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execute_ir_request, op=234, reason=vm_backend_failed_no_fallback}

Cases[{{1,2},{2,2}}, {i_,j_}/; {3,3}[[i]]+{3,3}[[j]]==6]
→ mathematica(ast): error node
```

### S-008 — MATLAB 嵌套 `for` + `return`

题解（`projects/problems/two-sum/solvers/matlab-sxo/solution.m`，**勿改算法**）：

```matlab
function out = twoSum(nums, target)
    n = length(nums);
    for i = 1:(n - 1)
        for j = (i + 1):n
            if nums(i) + nums(j) == target
                out = [i - 1, j - 1];
                return;
            end
        end
    end
    out = [];
end
```

```text
node --import tsx projects/conformance/scripts/run_matlab_sxo_solver.ts projects/problems/two-sum
# matlab(oak): error node（evaluate 阶段，非 parse-only）
```

最小 evaluate（`Matlab.create({ autoSimplify: false })`）：

```text
输入：{solution 全文}

twoSum([3, 3], 6)
→ Error: matlab(oak): error node
```

## 上游验收标准（切片完成后）

1. 上表最小 evaluate 与 `metadata.tests` 全绿（`two-sum`）。
2. `pnpm bench:wolfram-sxo --id two-sum` / `pnpm bench:matlab-sxo --id two-sum` 写出非空 `runtimeMs`。
3. 看板 **语言综合成绩** 中 Wolfram (Sxo) / MATLAB (Sxo) **有效样本 ≥ 1**（随题解扩面再涨）。

## 新增条目模板

```markdown
| S-0xx | 简短名 | open | <slug> 或 matrix case | @sxo/<pkg> 或 dialect 路径 | 阻塞原文 |
```

## 标签约定

- 看板、bench JSON、`RUNTIME_LANGUAGES`：**Wolfram (Sxo)**、**MATLAB (Sxo)**（`@sxo/*` npm 包名仍小写）
- 文档说明：SXO frontend，**不是** Wolfram Engine / MATLAB Runtime
