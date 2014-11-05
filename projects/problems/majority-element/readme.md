# [Majority Element](https://leetcode.com/problems/majority-element/)

## 问题

给定大小为 $n$ 的数组 `nums`，其中**多数元素**出现次数严格大于 $\lfloor n/2 \rfloor$。假设多数元素一定存在，返回该元素。

**示例 1**

- **输入**：`nums = [3, 2, 3]`
- **输出**：`3`

**示例 2**

- **输入**：`nums = [2, 2, 1, 1, 1, 2, 2]`
- **输出**：`2`

**约束**

- $n = \mathrm{len}(\texttt{nums})$
- $1 \le n \le 5 \times 10^4$
- $-10^9 \le \texttt{nums}[i] \le 10^9$

## 解答

### 朴素想法

用映射统计每个值出现次数，找计数 $> \lfloor n/2 \rfloor$ 的键。时间 $O(n)$，空间 $O(n)$。

### 频次表空间瓶颈

多数元素超过半数，可用对消思想而不存完整计数。

### 摩尔投票抵消优化

维护候选 `candidate` 与票数 `count`。遍历 $x$：若 $count=0$ 则换候选为 $x$ 且 $count=1$；否则若 $x=\texttt{candidate}$ 则 $count++$，否则 $count--$。成对的不同元素相互抵消，最后候选即为多数元素。

### 最终算法

一遍摩尔投票得到 `candidate` 并返回（题设保证存在多数元素，无需二次验证）。

## 复杂度分析

### 时间复杂度

$O(n)$

单次线性扫描。

### 空间复杂度

$O(1)$

仅候选与计数两个变量。
