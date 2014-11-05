# [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## 问题

给定数组 `prices`，`prices[i]` 为第 $i$ 天股价。最多完成**一笔**交易（先买后卖），求最大利润；若无法盈利返回 $0$。

**示例 1**

- **输入**：`prices = [7, 1, 5, 3, 6, 4]`
- **输出**：`5`
- **解释**：第 $2$ 天买（$1$）、第 $5$ 天卖（$6$），利润 $5$。

**示例 2**

- **输入**：`prices = [7, 6, 4, 3, 1]`
- **输出**：`0`

**约束**

- $1 \le \mathrm{len}(\texttt{prices}) \le 10^5$
- $0 \le \texttt{prices}[i] \le 10^4$

## 解答

### 朴素想法

枚举所有买入日 $i$ 与卖出日 $j>i$，取最大 $\texttt{prices}[j] - \texttt{prices}[i]$。$O(n^2)$。

### 买卖日组合爆炸瓶颈

固定卖出日时，最优买入日一定是该日之前最低价，无需枚举所有 $i$。

### 前缀最低价一次扫描优化

从左到右：维护截至当日的最低买入价 $\texttt{minPrice}$；在第 $i$ 天卖出可得利润 $\texttt{prices}[i] - \texttt{minPrice}$，更新全局最大利润。一遍完成。

### 最终算法

初始化 $\texttt{minPrice} = +\infty$、$\texttt{maxProfit} = 0$。遍历每天价格：先更新 $\texttt{minPrice}$，再用当日价减 $\texttt{minPrice}$ 尝试刷新 $\texttt{maxProfit}$。返回 $\texttt{maxProfit}$。

## 复杂度分析

### 时间复杂度

$O(n)$

单次线性扫描。

### 空间复杂度

$O(1)$

仅两个标量状态。
