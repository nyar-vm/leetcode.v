# Minimum Flips To Make A Or B Equal To C

- **LeetCode**：[#1318 Minimum Flips To Make A Or B Equal To C](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/)
- **难度**：Medium
- **标签**：Bit Manipulation

## 题目

Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).\r
Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.\r
\r
\r
**Example 1**：\r
\r
\r
\r
\r
**Input**：a = 2, b = 6, c = 5\r
**Output**：3\r
**Explanation**：After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)\r
\r
**Example 2**：\r
\r
\r
**Input**：a = 4, b = 2, c = 7\r
**Output**：1\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：a = 1, b = 2, c = 3\r
**Output**：0\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 <= a <= $10^{9}$\r
1 <= b <= $10^{9}$\r
1 <= c <= $10^{9}$\r
