# Maximum Alternating Subsequence Sum

- **LeetCode**：[#1911 Maximum Alternating Subsequence Sum](https://leetcode.com/problems/maximum-alternating-subsequence-sum/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming

## 题目

The alternating sum of a 0-indexed array is defined as the sum of the elements at even indices minus the sum of the elements at odd indices.\r
\r
\r
For example, the alternating sum of [4,2,5,3] is (4 + 5) - (2 + 3) = 4.\r
\r
\r
Given an array nums, return the maximum alternating sum of any subsequence of nums (after reindexing the elements of the subsequence).\r
\r
\r
\r
\r
A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] (the underlined elements), while [2,4,2] is not.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [4,2,5,3]\r
**Output**：7\r
**Explanation**：It is optimal to choose the subsequence [4,2,5] with alternating sum (4 + 5) - 2 = 7.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [5,6,7,8]\r
**Output**：8\r
**Explanation**：It is optimal to choose the subsequence [8] with alternating sum 8.\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：nums = [6,2,1,2,4,5]\r
**Output**：10\r
**Explanation**：It is optimal to choose the subsequence [6,1,5] with alternating sum (6 + 5) - 1 = 10.\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(nums)$ $\le 105$\r
1 <= nums[i] $\le 105$\r
