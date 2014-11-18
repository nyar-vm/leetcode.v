# Valkyrie 和类型 / 联合类型 taxonomy（2026-09）

leetcode 侧记录的 **语言设定**，权威规范仍以 `valkyrie-2020` / 兄弟仓演进为准。实现缺口见 `capability-backlog.md` V-011–V-013。

## 总览


| 形态                           | 语法                                   | 判别                                   | 典型用途                        |
| ---------------------------- | ------------------------------------ | ------------------------------------ | --------------------------- |
| **Tagged sum（`unite`）**      | `unite Name { Variant { ... } ... }` | **必有 tag**（显式 `[tag(...)]` 或编译器自动派生） | `Option`、`Result`、封闭 ADT    |
| **Named untagged union**     | `union Name { ... }`                 | **无 tag**，靠布局 / 活跃字段约定               | 大整数 limb 视图、与 C 互操作 payload |
| **Anonymous untagged union** | `A | B | C`（类型表达式）                   | **无 tag**，开放联合                       | 约束、泛型 bound、临时组合类型          |


三者 **不可混用语义**：`unite` 不是「带名字的 `A|B`」；`union Foo` 不是「缺 tag 的 `unite`」。

## `unite` — 始终 tagged

- **设定**：凡 `unite` 声明，每个 variant 在可观察语义上均有判别 tag；作者可写 `[tag(K)]` / variant 级 `[tag(n)]`，**未写时编译器按声明顺序自动派生**（与 `Option`/`Result` 现用手写 tag 兼容，新代码可不写）。
- **实现落点**：`valkyrie.rs` parser 已有 `SumTypeKind::Unite`；需 nyar / HIR / backend 保证 **缺省 tag 派生** 与 `match`  exhaustiveness 一致。
- **std 现状**：`core::types::Option`、`Result` 仍显式 `[tag(...)]`；迁移时可逐步改为依赖自动派生，行为不变。

## Named untagged — `union Name { ... }`

- **设定**：名义 **开放 / 无 tag** 联合；成员为具名字段或 variant 块（与 `unite` 块语法可相似，但 **无** `OptionKind` 类 tag 类型）。
- **动机**：大整数等多表示（如「小整数 inline / 大数组 heap」）需 **共享存储、无判别字节** 或靠外部 invariant；参考 `athena.rs` 中大整数设计（**named union**，非 `i64 | BigArray` 匿名联合 alone）。
- **实现状态**：parser 已有 `SumTypeKind::Union` 关键字路径；**语义、布局、typecheck、MIR 未完备** — backlog **V-012**。

## Anonymous untagged — `A | B | C`

- **设定**：类型位置的 **匿名** 联合；无独立类型名，用于签名与约束（如「接受 `ArrayList<i64>` 或 digit 数组」的过渡 API）。
- **实现状态**：`vcc-data` 已解析 `TypeExpression::Union`；完整子typing / 收窄 **未完备** — backlog **V-013**。
- **与 `unite` 区别**：`A|B` 不引入新 nominal type，也不自动生成 tag；不能替代 `Option`/`Result`。

## 与 leetcode 刷题的关系


| 场景                             | 应用类型                 | 现状                                           |
| ------------------------------ | -------------------- | -------------------------------------------- |
| 可选值、错误                         | `unite` / `Option`   | ✅ phase-1                                    |
| `metadata.tests` 超 $2^{53}$ 整数 | 需可靠大整数或字符串键          | JSON harness 限制；算法层常用手写 digit 数组（`plus-one`） |
| 统一 `BigInt` std                | named `union` + limb | **阻塞 V-012**；勿在题解里 hack 匿名 `|`               |
| 测例互操作「多形参数」                    | 匿名 `A | B`           | **阻塞 V-013**；优先显式 overload 或题面专用类型           |


## 验收（上游切片）

1. **V-011**：无 `[tag]` 的 `unite` 测试用例编译 + `match` 行为与显式 tag 一致。
2. **V-012**：最小 `union` 声明 + 字段读写 + legion test；对照 `athena.rs` 大整数 limb 模式写设计注释（不复制路径进仓）。
3. **V-013**：`fn f(x: A | B)` 或等价约束解析 + 拒绝无收窄的非法访问。

