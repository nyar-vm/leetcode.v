# Least Number Of Unique Integers After K Removals

- **LeetCode**：[#1481 Least Number Of Unique Integers After K Removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/)
- **难度**：Medium
- **标签**：Greedy · Array · Hash Table · Counting · Sorting

## 题目

Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.\r
\r
\r
\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：arr = [5,5,4], k = 1\r
**Output**：1\r
**Explanation**：Remove the single 4, only 5 is left.\r
\r
**Example 2**：\r
\r
\r
**Input**：arr = [4,3,1,1,3,3,2], k = 3\r
**Output**：2\r
**Explanation**：Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(arr)$ <= $10^{5}$\r
1 <= arr[i] <= $10^{9}$\r
0 <= k $\le \mathrm{len}(arr)$\r
