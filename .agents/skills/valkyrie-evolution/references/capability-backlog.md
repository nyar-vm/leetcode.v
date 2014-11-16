# Valkyrie 能力 backlog（leetcode 驱动）

活文档：由 `valkyrie-evolution` 维护。状态：`open` | `planned` | `upstream` | `done` | `wont`。

| ID    | 能力簇                              | 状态 | 动机（题 / 场景） | 上游落点                              | 备注                     |
|-------|-------------------------------------|------|-------------------|---------------------------------------|--------------------------|
| V-001 | 链表 `ListNode` 互操作              | open | 多数链表题        | `std.collection` 或题面专用类型       | phase-1 暂缓             |
| V-002 | 二叉树 / N 叉树节点                 | open | 树遍历、路径题    | `std.collection` 或 `std.tree`        | 需与 JSON 测例互操作设计 |
| V-003 | `BinaryHeap` / 优先队列可用性       | done | TopK、合并 K 路   | `std.collection/BinaryHeap.v` + `test_core_collection.v` | min-heap API 与 `PriorityQueue` 已验收 |
| V-004 | 并查集 `DisjointSet`                | open | 连通分量类        | `std.collection/DisjointSet.v` + test | 同上                     |
| V-005 | 二维 DP 表 / 矩阵                   | open | 路径、编辑距离    | `Array` 嵌套或 `ArrayList`            | 语法 + std 边界          |
| V-006 | `legion build --target node` 题解 harness | upstream | coach 批次 11 题 | `valkyrie.rs` legion + `legions.von` 含 `std.adaptors._` | 2026-09：workspace 缺 adaptor 已修 |
| V-009 | `char.lowercase_ascii_index` | done | `valid-anagram` | `core::text::char` | 配合 `Utf8Text.char_at`（V-010） |
| V-010 | `Utf8Text.char_at`（0-based 逻辑下标） | done | `valid-anagram`、下标字符串题 | `std.text.Utf8Text` | 与 `count_char` / `byte_offset` 一致 |
| V-007 | 字符串切片与 `Utf8Text` 互操作      | open | 字符串题          | `std.text`                            | 对照 TS `string` 语义    |
| V-008 | 递归深度 / 栈溢出策略               | open | DFS 题            | nyar / core                           | 文档化限制或尾调用       |

## 新增条目模板

```markdown
| V-0xx | 简短名 | open | <slug> 或测试命令 | valkyrie.v 路径 | 阻塞原文或 coach 算法需求 |
```

## 与 phase-1 的关系

已覆盖（通常 **不** 进 backlog，除非 API 损坏）：`ArrayList`、`HashMap`、标量异或、滚动变量、双指针、摩尔投票、小计数表。见
`leetcode-implement/references/v-phase1-capabilities.md`。
