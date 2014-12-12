# [Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)

## 问题

有一条花坛，用整数数组 `flowerbed` 表示：`0` 表示空地，`1` 表示已种花。规则是**不能有两朵花相邻**（输入保证初始已满足）。

给定整数 `n`，判断能否再种 `n` 朵花且不违反相邻规则。能则返回 true，否则 false。

**示例 1**

- **输入**：`flowerbed = [1, 0, 0, 0, 1]`，`n = 1`
- **输出**：`true`

**示例 2**

- **输入**：`flowerbed = [1, 0, 0, 0, 1]`，`n = 2`
- **输出**：`false`

**约束**

- $1 \le \mathrm{len}(\texttt{flowerbed}) \le 2 \times 10^4$
- `flowerbed[i]` 为 $0$ 或 $1$
- 初始花坛无相邻花
- $0 \le n \le \mathrm{len}(\texttt{flowerbed})$

## 解答

### 朴素想法

枚举所有空地子集，检查是否恰好选 $n$ 个且互不相邻。组合爆炸。

### 逐格决策瓶颈

对每个空地独立判断是否可种，不利用「种下一朵会占用相邻格」的连锁约束，需回溯，最坏指数级。

### 线性贪心优化

从左到右扫描：若当前格为空，且左、右邻格（边界外视为空）均为空，则在此种花并令剩余需求减 $1$。能种就种不会妨碍更优方案——早占位只减少后续选择，不会增加可种总数。

等价技巧：在数组首尾补虚拟 $0$，当 `flowerbed[i-1] + flowerbed[i] + flowerbed[i+1] == 0` 时在第 $i$ 格种花。

### 最终算法

`remaining = n`。扫描每个下标 $i$：若 `flowerbed[i]==0` 且左右邻为空，则置 `flowerbed[i]=1`，`remaining--`；若 `remaining==0` 提前返回 true。扫完返回 `remaining <= 0`。

## 复杂度分析

### 时间复杂度

$O(m)$

$m = \mathrm{len}(\texttt{flowerbed})$，单遍扫描。

### 空间复杂度

$O(1)$

仅常数额外变量；原地修改可选。
