# Maximize The Beauty Of The Garden

- **LeetCode**：[#1788 Maximize The Beauty Of The Garden](https://leetcode.com/problems/maximize-the-beauty-of-the-garden/)
- **难度**：Hard
- **标签**：Greedy · Array · Hash Table · Prefix Sum

## 题目

There is a garden of n flowers, and each flower has an integer beauty value. The flowers are arranged in a line. You are given an integer array flowers of size n and each flowers[i] represents the beauty of the ith flower.\r
\r
A garden is valid if it meets these conditions:\r
\r
\r
The garden has at least two flowers.\r
The first and the last flower of the garden have the same beauty value.\r
\r
\r
As the appointed gardener, you have the ability to remove any (possibly none) flowers from the garden. You want to remove flowers in a way that makes the remaining garden valid. The beauty of the garden is the sum of the beauty of all the remaining flowers.\r
\r
Return the maximum possible beauty of some valid garden after you have removed any (possibly none) flowers.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：flowers = [1,2,3,1,2]\r
**Output**：8\r
**Explanation**：You can produce the valid garden [2,3,1,2] to have a total beauty of 2 + 3 + 1 + 2 = 8.\r
\r
**Example 2**：\r
\r
\r
**Input**：flowers = [100,1,1,-3,1]\r
**Output**：3\r
**Explanation**：You can produce the valid garden [1,1,1] to have a total beauty of 1 + 1 + 1 = 3.\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：flowers = [-1,-2,0,-1]\r
**Output**：-2\r
**Explanation**：You can produce the valid garden [-1,-1] to have a total beauty of -1 + -1 = -2.\r
\r
\r
\r
**Constraints**：\r
\r
\r
2 $\le \mathrm{len}(flowers)$ $\le 105$\r
-104 <= flowers[i] $\le 104$\r
It is possible to create a valid garden by removing some (possibly none) flowers.\r
