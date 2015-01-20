# sxo-framework 布局（leetcode 视角）

兄弟仓 **sxo-framework** 供 leetcode 通过 **npm 包** 消费。本机路径勿写进题目或 metadata；链接用 `pnpm` workspace / `file:` / 私有 registry。

## leetcode 应依赖的 npm 包

| 包 | 用途 | 看板显示名 |
|----|------|------------|
| `@sxo/mathematica` | Wolfram 语法 frontend + evaluate | **Wolfram (Sxo)** |
| `@sxo/matlab` | MATLAB 语法 frontend + evaluate | **MATLAB (Sxo)** |
| `@sxo/core` | 共享 native 加载（经上面包 re-export） | （不单独上榜） |
| `@sxo/sxo-<platform>` | optional native addon | 宿主诊断用 |

**不是** `@sxo/harness` 的产品运行时（R&D feature-matrix 专用）。

## sxo-framework 目录（演进落点）

| 路径 | 内容 |
|------|------|
| `projects/packages/sxo-mathematica/` | Wolfram TS API、`wolframscript` bin |
| `projects/packages/sxo-matlab/` | MATLAB TS API |
| `projects/packages/sxo-core/` | 共享类型与 native 绑定 |
| `projects/dialects/sxo-dialect-mathematica/` | Wolfram lowering（Rust） |
| `projects/dialects/sxo-dialect-matlab/` | MATLAB lowering（Rust） |
| `projects/platforms/native/` | NAPI 平台包构建 |
| `projects/tooling/sxo-harness/` | feature-matrix _runner（参考，非产品依赖） |

leetcode **implement** 只放单脚本：

```text
projects/problems/<slug>/solvers/wolfram-sxo/solution.wl
projects/problems/<slug>/solvers/matlab-sxo/solution.m
```

无题级 `package.json`。`projects/conformance/package.json` 声明 `@sxo/mathematica`、`@sxo/matlab`。

## 常用命令

```text
# 上游（在 sxo-framework 根）
pnpm --filter @sxo/mathematica test
pnpm --filter @sxo/matlab test
pnpm --filter @sxo/mathematica report:features
pnpm --filter @sxo/matlab report:features

# leetcode（单题，harness 就绪后）
node --import tsx projects/conformance/scripts/run_wolfram_sxo_solver.ts projects/problems/<slug>
node --import tsx projects/conformance/scripts/run_matlab_sxo_solver.ts projects/problems/<slug>
```

## 与 valkyrie 链的关系

| 链 | 上游 | leetcode 求解器 |
|----|------|-----------------|
| Valkyrie | `valkyrie.v` / `valkyrie.rs` | `solvers/valkyrie/` |
| SXO 方言 | `sxo-framework` npm | `solvers/wolfram-sxo/`、`matlab-sxo/` |

两条链独立；缺 V std 走 `valkyrie-evolution`，缺 @sxo 构造走 **本 skill**。
