# 下标：ordinal 与 cardinal

## 定义

| 术语         | 含义                  | 合法范围（长度 $n$） |
|--------------|-----------------------|----------------------|
| **ordinal**  | 第几个元素（从 1 计） | $1 \ldots n$         |
| **cardinal** | 偏移量（从 0 计）     | $0 \ldots n-1$       |

## `ArrayList` API

以 `std.collection.ArrayList` 为准：

| 操作                                 | 参数基准 | 备注                                  |
|--------------------------------------|----------|---------------------------------------|
| `get(ordinal)` / `list[ordinal]`     | 1-based  | `ordinal == 0` → 越界                 |
| `list⁅cardinal⁆`                     | 0-based  | 等价 `get(cardinal + 1)`              |
| `set(ordinal, v)` / `list[ordinal]=` | 1-based  |                                       |
| `list⁅cardinal⁆=`                    | 0-based  |                                       |
| `insert(ordinal, v)`                 | 1-based  | `ordinal` 为 0 或 $> length+1$ 时无效 |
| `remove(ordinal)`                    | 1-based  |                                       |

## 常见错误

```text
<# 错误：把 LeetCode 下标 i=0 直接放进 [i] #>
let x = nums[0]   <# 若意图是第一个元素，应写 nums[1] 或 nums⁅0⁆ #>

<# 推荐：逻辑下标 i 从 0 到 length-1 #>
let x = nums⁅i⁆.unwrap()
```

## 与题解 readme 的关系

`readme.md`（coach）里的下标叙述遵循 **LeetCode 题面（0-based）**。仅 `solution.v` 实现需注意 V 的双轨下标。
