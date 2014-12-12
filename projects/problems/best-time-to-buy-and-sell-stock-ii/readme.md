# [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

## 问题

给定整数数组 `prices`，`prices[i]` 为第 $i$ 天股价。每天可买卖股票，但任意时刻最多持有 **一股**；可在同一天先买后卖。

求可获得的最大总利润。

**示例 1**

- **输入**：`prices = [7, 1, 5, 3, 6, 4]`
- **输出**：`7`
- **解释**：例如第 2 天买、第 3 天卖得 $4$，第 4 天买、第 5 天卖得 $3$，合计 $7$。

**示例 2**

- **输入**：`prices = [1, 2, 3, 4, 5]`
- **输出**：`4`

**示例 3**

- **输入**：`prices = [7, 6, 4, 3, 1]`
- **输出**：`0`

**约束**

- $1 \le \mathrm{len}(\texttt{prices}) \le 3 \times 10^4$
- $0 \le \texttt{prices}[i] \le 10^4$

## 解答

### 朴素想法

枚举所有买卖日组合或状态机 DP（持有/不持有）。可行但 $O(n)$ 贪心更直接。

### 全局最优交易瓶颈

试图一次找最低买、最高卖，无法覆盖「多段上涨」：中间回落后再次上涨应分开吃尽。

### 上涨段累加优化

若 $\texttt{prices}[i] > \texttt{prices}[i-1]$，则可在 $i-1$ 买、$i$ 卖，贡献 $\texttt{prices}[i] - \texttt{prices}[i-1]$。任意完整交易可拆成若干相邻日正差价之和；只累加正差价即最大利润。

### 最终算法

`ans = 0`。对 $i = 1 \ldots n-1$：若 `prices[i] > prices[i-1]`，则 `ans += prices[i] - prices[i-1]`。返回 `ans`。

## 复杂度分析

### 时间复杂度

$O(n)$

单遍扫描，$n = \mathrm{len}(\texttt{prices})$。

### 空间复杂度

$O(1)$

仅常数累加变量。
