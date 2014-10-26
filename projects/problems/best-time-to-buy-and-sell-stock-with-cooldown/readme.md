# Best Time To Buy And Sell Stock With Cooldown

- **LeetCode**：[#309 Best Time To Buy And Sell Stock With Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming

## 题目

You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1**：

**Input**：prices = [1,2,3,0,2]
**Output**：3
**Explanation**：transactions = [buy, sell, cooldown, buy, sell]

**Example 2**：

**Input**：prices = [1]
**Output**：0


**Constraints**：

1 $\le \mathrm{len}(prices)$ $\le 5000$
0 <= prices[i] $\le 1000$
