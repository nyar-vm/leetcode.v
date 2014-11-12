# 缺口分诊

## 快速判断

| 症状                     | 类型                      | 先查                                             |
|--------------------------|---------------------------|--------------------------------------------------|
| 找不到类型 / `namespace` | std 未实现或未进 prelude  | `valkyrie.v/projects/std/legion.von`、`_prelude` |
| 方法存在但链接失败       | adaptor / `host_contract` | `std.adaptors._`                                 |
| 语法不接受合法 V         | 编译器                    | `valkyrie.rs`、nyar 报错栈                       |
| 仅 node 目标失败         | legion 目标配置           | 题 `legion.von`、`legion build --target node`    |
| 逻辑对但测例不过         | **题解**（非本 skill）    | `leetcode-implement`                             |

## std 已存在 vs 真缺失

1. 在 `valkyrie.v/projects/std/source/` 下 **按文件名** 搜（如 `BinaryHeap.v`）。
2. 读 `namespace` 与 `imply`：是否仅有 `[host_contract]` stub。
3. 读 `projects/std/test/collection/` 是否有对应用例。
4. **有文件无测试** → 切片计划优先补测试 + 公开 API，而非重写。

## 优先级（默认）

1. 解锁 **已有 coach + TS/Python 绿** 的题的 V 解
2. 解锁 **同一能力簇** 的多题（如堆 → 多道 TopK）
3. 编译器/legion 阻塞 **整批** V 解
4. 单题冷门 API

## 禁止

- 在 leetcode.v 内嵌 std 副本或 fork 大段 `valkyrie.v` 进题目目录
- 为绕过缺口在 `solution.v` 写宿主特定 hack（除非 backlog 明确记 `wont` 并文档化）
