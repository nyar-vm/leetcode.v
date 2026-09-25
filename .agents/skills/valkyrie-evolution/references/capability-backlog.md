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
| V-011 | `unite` 强制 tagged + 缺省 tag 自动派生 | planned | `Option`/`Result`、全部 ADT | `valkyrie.rs` nyar/HIR/backend；`core::types` | 见 `type-taxonomy.md` §unite |
| V-012 | named `union Name { ... }`（untagged） | open | 大整数（参考 `athena.rs`）、C 互操作 payload | `valkyrie.rs` + `std`（待定） | parser 有 `SumTypeKind::Union`；语义/布局未完备 |
| V-013 | 匿名 `A \| B \| C` 类型联合           | open | 泛型约束、测例多形参数 | `valkyrie.rs` typechecker | `TypeExpression::Union` 已解析 |

### V-011–V-013 专家评估后的工作包（2026-09-23）

- **U-W1 / V-011，owner: nyar-language：** 保留三种 sum 身份，规范核对缺省 tag、显式 tag 混用与重值诊断；验证 GADT、match 穷尽性和跨包 tag 表。`nyar-vm.rs` `dev` 已落地：named `union` AST 拒绝、三种 sum 重名诊断、`resolve_sum_variant_tag` 统一校验与 layout、跨包 `imported_semantic_exports` 判别校验与 layout（`sum_discriminator_tests` 12 例）、GADT 变体 `result_type` 与穷尽性 lib 回归（`nominal_contract_tests` 5 例）。`--test valkyrie` 集成 harness 仍 open，端到端 runtime 验收未闭合。
- **U-W2 / V-011，owner: core：** Option/Result 暂保留显式 tag；待 U-W1 和 Node runtime 验证后再评估移除，零回归为门禁。
- **U-W3 / V-012，owner: nyar-language + Representation Planner：** named union 身份、活跃成员检查和无 GC ref 的固定 overlay 布局；错误成员读取须诊断失败。
- **U-W4 / V-012，owner: nyar-emitter：** 各 target 先对无合同的 untagged union fail-fast；Wasm 编码仅在 U-W3 语义、布局及 GC trace 合同完整后实施。
- **U-W5 / V-013，owner: nyar-language typechecker：** 匿名 union 的子类型、共同成员访问与有证据的控制流收窄；未收窄专属访问须报错。`T | null` 单列 nullable 设计，不等同 Option。
- **U-W6 / V-012，owner: std + conformance：** 核实大整数 limb 需求后设计 BigInt；超 JS 安全整数的 metadata JSON 还需独立 harness 合同。
- **U-W7，owner: leetcode.v：** phase-1 保留 digit 数组、显式 overload 或题面专用类型，禁止匿名 `|` 与提前使用 named union 绕过类型门禁；记录 golden 正反例。

顺序：U-W1 先闭合身份和 tag 合同；U-W3、U-W5 随后可并行设计；U-W4、U-W6 依赖 U-W3。V-011 仍 planned，V-012/V-013 仍 open；parser 或 shape 单测不能改变状态。
| V-014 | `char` ASCII 字母数字 / 元音判定   | done | `valid-palindrome`、`reverse-vowels-of-a-string` | `core::text::char` | `is_ascii_alphanumeric`、`ascii_alnum_key`、`is_ascii_vowel` |
| V-015 | `char as u32` / `As<u32>` 原语转换   | done | `valid-palindrome`、`lowercase_ascii_index` | `core::text::char` + `core::types::conversion` | `char as u32` 已可用；已移除 `to_u32()` shim |
| V-016 | `Utf8Builder.append_i64` 十进制格式化 | done | `summary-ranges` 等需输出数字字符串的题 | `std.text.Utf8Builder` + `test_utf8_builder.v` | 含 `0` 与 `-2147483648` 边界 |
| V-017 | **leetcode wasm invoke harness（P0）** | upstream | `vRuntimeMs`、跑飞检测、三语言对比 | `valkyrie.rs` legion/nyar-emitter：① Windows `\\?\` 路径下 package 须能收集 `solution.v`（`path_for_local_fs`）② 仅 `[export]` 顶层 `micro` 进 MIR/wasm（`snake_case` 实现，`[export(case: "camelCase")]` 导出 `twoSum`）③ glue `callExport`/`invokeLeetCode` + JSON 编解码 | leetcode `run_v_solver.ts` + `resolveWasmExportSymbol` 已就绪 |

### V-017 分阶段交付（2026-09-23 评估）

- **V-017a / W1，manifest 与 source closure：** `valkyrie.rs` 为 library artifact 和 `entry` 建立受验证合同，修正 Windows 根目录收集、重复 std 源与 cache key。验收：`solution.v` 恰好一次进入完整 semantic group。
- **V-017b / W2，多 export：** `nyar-vm.rs` 贯通显式 HIR export 的 `exported_name` 到 MIR/Wasm 导出表；正式 library 缺 executable MIR 时失败。验收：`spy wasm --list` 包含 `twoSum`，无 class 隐式 export。
- **V-017c / W3，library glue：** `nyar-vm.rs` 提供 import 无执行的 `callExport(name, ...args)` 与签名驱动 JSON↔GC 边界。验收：数组、负整数、空值和错误路径通过 Node 实际调用。
- **V-017d / W4–W5，消费与测量：** `leetcode.v` 固定顶层 wrapper 模板、参数顺序与无解语义；先跑 two-sum 全部 metadata.tests，再扩 10 题，最后记录真实 `vRuntimeMs`。当前无通过日志或 after 片段。
- **V-017e，post-0.0.x：** class 与方法显式 export、实例 ABI 和高层路由另立合同；不阻断方案 A。

本条目状态仍为 upstream，不能以单题 smoke 关闭。

## 和类型 taxonomy

`unite`（始终 tagged，可自动派生 tag） vs named `union`（untagged） vs 匿名 `A|B|C`（untagged）见 [type-taxonomy.md](type-taxonomy.md)。

## 新增条目模板

```markdown
| V-0xx | 简短名 | open | <slug> 或测试命令 | valkyrie.v 路径 | 阻塞原文或 coach 算法需求 |
```

## 与 phase-1 的关系

已覆盖（通常 **不** 进 backlog，除非 API 损坏）：`ArrayList`、`HashMap`、标量异或、滚动变量、双指针、摩尔投票、小计数表。见
`leetcode-implement/references/v-phase1-capabilities.md`。
