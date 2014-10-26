# Maximum Number That Makes Result Of Bitwise And Zero

- **LeetCode**：[#3125 Maximum Number That Makes Result Of Bitwise And Zero](https://leetcode.com/problems/maximum-number-that-makes-result-of-bitwise-and-zero/)
- **难度**：Medium
- **标签**：Greedy · String · Sorting

## 题目

Given an integer n, return the maximum integer x such that x <= n, and the bitwise AND of all the numbers in the range [x, n] is 0.

**Example 1**：

**Input**：n = 7
**Output**：3
**Explanation**：
The bitwise AND of [6, 7] is 6.
The bitwise AND of [5, 6, 7] is 4.
The bitwise AND of [4, 5, 6, 7] is 4.
The bitwise AND of [3, 4, 5, 6, 7] is 0.

**Example 2**：

**Input**：n = 9
**Output**：7
**Explanation**：
The bitwise AND of [7, 8, 9] is 0.

**Example 3**：

**Input**：n = 17
**Output**：15
**Explanation**：
The bitwise AND of [15, 16, 17] is 0.


**Constraints**：

1 <= n $\le 1015$
