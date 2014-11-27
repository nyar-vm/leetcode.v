---
name: valkyrie-guide
description: >-
  刷题流程第②步（V 子流程）。完整刷题见 leetcode-practice。
  Valkyrie（V）语言与 std 约定：1-based ordinal 与 0-based cardinal 下标、
  namespace、Option、legion 工程布局。写 solution.v 或读 valkyrie.v 时加载。
  用户提及 V、valkyrie、下标、ArrayList、HashMap、legion 时加载。
---

# Valkyrie Guide

本 skill 描述 **V 语言与 std 的设计习惯**，供 `leetcode.v` 写 `solution.v` 或对照 `../valkyrie.v` 时查阅。权威实现以兄弟仓
`valkyrie.v` 源码为准。

## 何时使用

- 实现 / 审查 `solvers/valkyrie/solution.v`
- 疑惑「该用 `[i]` 还是 `⁅i⁆`」
- 选 `HashMap` / `ArrayList` / 原始类型
- 配置 `legion.von` 与 workspace 依赖

与 `leetcode-implement` 配合：implement 管三端对齐与跑测， **本 skill 管 V 语法与 std 语义**。

## 下标：ordinal 与 cardinal（重要）

`ArrayList` 等集合在 API 层区分两套下标（见 `valkyrie.v` `std/source/collection/ArrayList.v`）：

| 写法       | 名称          | 基准        | 说明                                |
|------------|---------------|-------------|-------------------------------------|
| `list[i]`  | **ordinal**   | **1-based** | `get(ordinal)`：`ordinal == 0` 非法 |
| `list⁅i⁆`  | **cardinal**  | **0-based** | 内部等价 `get(i + 1)`               |
| `list⁅i⁆=` | cardinal 赋值 | 0-based     | 等价 `set(i + 1, value)`            |

**习惯**

- 与 LeetCode / `metadata.tests` 对齐的 **逻辑下标**（从 0 开始）→ 优先用 **`⁅i⁆`** 访问 `ArrayList`。
- 勿把 C/Java/TS 的 `arr[i]` 直接当成 0-based 套到 V 的 **`[i]`** 上。
- `insert` / `remove` / `set` 的 **ordinal 参数同样 1-based**。

详表与陷阱见 [references/indexing.md](references/indexing.md)。

## std 命名空间

| 路径             | 典型类型                                         |
|------------------|--------------------------------------------------|
| `std.collection` | `ArrayList`、`HashMap`、`Deque`、`OrderedMap`、… |
| `std.text`       | `Utf8Text`、`AsciiText`                          |
| `core`           | `i32`、`i64`、`bool`                             |

集合 **只用单数** `std.collection`，勿写已废止的 `std.collections`
。详表见 [references/std-namespaces.md](references/std-namespaces.md)。

`leetcode.v` 根 `legions.von` 注册 `../valkyrie.v/projects/core` 与 `std`；单题 `legion.von` 写
`dependencies: { core: true, std: true }`。

## 语言片段

```text
namespace my.module;

class Solution {
    micro foo(mut self, nums: ArrayList<i64>): i64 { ... }
}

imply Solution {
    micro helper(self, x: i64): bool { ... }
}
```

- 方法用 **`micro`**；会修改接收者时 **`mut self`**。
- 扩展方法写在 **`imply Type { ... }`**。
- 可选值：`Option<T>`、`Some(v)`、`None` / `option_none::<T>()`（ **`unite` = tagged sum**；缺省 tag 由编译器派生，见 `valkyrie-evolution/.../type-taxonomy.md`）。
- **勿混淆**：named **`union Foo { ... }`**（untagged，大整数等）与类型表达式 **`A | B`**（匿名 untagged）— 二者均 **不是** `unite`。
- 循环：`while cond { ... }`、`loop item in collection { ... }`。
- 整数异或：`i64` 上可用 `^`（见 `core` `i64`）。
- **`char` 码位**：使用 **`ch as u32`**（原始 `as`；`to_u32()` 已移除，见 backlog **V-015**）。
- 注释： **`#` 行注释**、 **`<#` … `#>` 块注释**（可嵌套）。 **不支持** `//` 或 `/* */`。std 里偶见的 `⍝` 为遗留，新代码勿用。

## legion 工程（leetcode 单题）

```text
solvers/valkyrie/
├── legion.von    # entry: "solution.v", build target node
└── solution.v
```

- **不要**在 `solution.v` 里写 `[benchmark]`；leetcode 用外部 harness 跑 `metadata.tests`。
- 编译：`legion build <dir> --target node -o ...`（Rust seed，见 `AGENTS.md` §维护者陷阱；非 `valkyrie.v` 自举 legion）。

## 与 LeetCode 测试数据的边界

- `metadata.json` 的 `tests` / 返回值约定来自 **LeetCode（0-based 下标、JSON 类型）**。
- V 内部用 `⁅i⁆` 遍历； **返回给 harness 的下标仍应是题面要求的 0-based**（与 TS/Python 一致），不要返回 ordinal。

## phase-1 选题（leetcode）

当前 std 适合：线性扫、哈希表、固定小表计数、异或、滚动变量、双指针交换、摩尔投票、数字反转。暂缓：树、图、堆、大二维 DP。

题型清单见 `leetcode-implement/references/v-phase1-capabilities.md`。 **缺能力时**加载 `../valkyrie-evolution/SKILL.md`
，在兄弟仓补 std / 工具链，勿在题解里绕过。

## 检查清单（写 solution.v 时）

- [ ] 访问 `ArrayList` 未误用 1-based `[i]` 当 0-based
- [ ] `HashMap` / `ArrayList` 在 `std.collection` 下
- [ ] 返回下标与 `metadata.tests` 一致（0-based）
- [ ] 已对照同题 coach readme 的最优算法

## 参考

- [references/indexing.md](references/indexing.md)
- [references/std-namespaces.md](references/std-namespaces.md)
- [references/legion-layout.md](references/legion-layout.md)
- 兄弟仓：`valkyrie.v/projects/std/source/`
