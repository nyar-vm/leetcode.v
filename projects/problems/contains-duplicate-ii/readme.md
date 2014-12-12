# [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)

## 问题

给定整数数组 `nums` 与整数 `k`，判断是否存在**不同下标** $i \ne j$，使得 `nums[i] == nums[j]` 且 $|i - j| \le k$。

**示例 1**

- **输入**：`nums = [1, 2, 3, 1]`，`k = 3`
- **输出**：`true`

**示例 2**

- **输入**：`nums = [1, 0, 1, 1]`，`k = 1`
- **输出**：`true`

**示例 3**

- **输入**：`nums = [1, 2, 3, 1, 2, 3]`，`k = 2`
- **输出**：`false`

**约束**

- $1 \le \mathrm{len}(\texttt{nums}) \le 10^5$
- $-10^9 \le \texttt{nums}[i] \le 10^9$
- $0 \le k \le 10^5$

## 解答

### 朴素想法

枚举所有 $(i, j)$ 对检查相等与距离。$O(n^2)$。

### 全表配对瓶颈

重复值可能很多，但只需知「最近一次出现位置」是否在 $k$ 范围内。

### 哈希表记录最近下标优化

维护 `值 → 上次下标`。扫描 $i$、值 $x$：若 $x$ 已出现且 $i - \text{last}[x] \le k$ 则 true；否则更新 $\text{last}[x] = i$。单遍 $O(n)$。

### 滑动窗口集合（等价思路）

维护大小至多 $k+1$ 的窗口集合：新元素已在集合中则 true；否则加入并移除窗口外元素。与上法同阶。

### 最终算法

用哈希表存最近下标。对每个 $i$：若 $\texttt{nums}[i]$ 曾出现且距离 $\le k$ 返回 true；更新最近下标。扫完返回 false。

## 复杂度分析

### 时间复杂度

$O(n)$

$n = \mathrm{len}(\texttt{nums})$，每个元素常数摊还。

### 空间复杂度

$O(n)$

哈希表最多存 $n$ 个键。
