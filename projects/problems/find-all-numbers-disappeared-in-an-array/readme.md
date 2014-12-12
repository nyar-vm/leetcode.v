# [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)

## 问题

给定长度为 $n$ 的数组 `nums`，其中 `nums[i]` 在 $[1, n]$ 范围内。返回 $[1, n]$ 中**未在 `nums` 中出现**的所有整数。

**示例 1**

- **输入**：`nums = [4, 3, 2, 7, 8, 2, 3, 1]`
- **输出**：`[5, 6]`

**示例 2**

- **输入**：`nums = [1, 1]`
- **输出**：`[2]`

**约束**

- $n = \mathrm{len}(\texttt{nums})$
- $1 \le n \le 10^5$
- $1 \le \texttt{nums}[i] \le n$

## 解答

### 朴素想法

用集合记录出现过的值，再枚举 $1 \ldots n$ 收集缺失项。正确，需 $O(n)$ 额外空间。

### 辅助集合瓶颈

值域恰为 $1 \ldots n$，与下标 $0 \ldots n-1$ 一一对应，不必另建哈希表。

### 原地负号标记优化

将「值 $v$ 出现过」编码到 `nums[v-1]`：遍历 $x$，令 $i = |x| - 1$；若 `nums[i] > 0` 则置为 `-nums[i]`（表示 $i+1$ 已出现）。再扫一遍：若 `nums[i] > 0` 则 $i+1$ 缺失，加入答案。

### 最终算法

原地标记后收集所有仍为正的下标 $i$ 对应的 $i+1$。返回结果数组（输出不计入额外空间）。

## 复杂度分析

### 时间复杂度

$O(n)$

两遍线性扫描。

### 空间复杂度

$O(1)$

除返回数组外仅原地修改 `nums`。
