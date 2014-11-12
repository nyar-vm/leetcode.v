# 上游仓布局

## `../valkyrie.v`

| 路径                              | 内容                                    |
|-----------------------------------|-----------------------------------------|
| `projects/core/source/`           | `i32`、`i64`、`bool`、`Option`、运算符  |
| `projects/std/source/collection/` | `ArrayList`、`HashMap`、`BinaryHeap`、… |
| `projects/std/source/text/`       | 字符串                                  |
| `projects/std/test/`              | std 单测（新能力必补）                  |
| `projects/std/legion.von`         | std 成员与编译单元列表                  |
| `projects/std.adaptors._/`        | JVM/CLR/Wasm 宿主 `host_provider`       |
| `legions.von`                     | workspace 根                            |

leetcode.v 通过根 `legions.von` 引用：

```text
../valkyrie.v/projects/core
../valkyrie.v/projects/std
```

## `../valkyrie.rs`

| 内容                                   |
|----------------------------------------|
| `legion` CLI、`@valkyrie-language/vcc` |
| Wasm / node 目标构建管线               |

题解 **不** 直接改 vcc，除非错误明确来自编译器（见 `triage.md`）。

## 常用命令（本机）

```text
# 上游 std
cd ../valkyrie.v/projects/std
legion test --target node

# 单题 V 解
cd leetcode.v
legion build projects/problems/<slug>/solvers/valkyrie --target node -o .cache/<slug>-node

# 链工具链（按需）
pnpm link:valkyrie
```

路径用参数或环境变量， **禁止** 把本机盘符写进上游源码。
