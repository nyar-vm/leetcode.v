# Minimize Maximum Pair Sum In Array

- **LeetCode**：[#1877 Minimize Maximum Pair Sum In Array](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/)
- **难度**：Medium
- **标签**：Greedy · Array · Two Pointers · Sorting

## 题目

The pair sum of a pair (a,b) is equal to a + b. The maximum pair sum is the largest pair sum in a list of pairs.\r
\r
\r
For example, if we have pairs (1,5), (2,3), and (4,4), the maximum pair sum would be max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8.\r
\r
\r
Given an array nums of even length n, pair up the elements of nums into n / 2 pairs such that:\r
\r
\r
Each element of nums is in exactly one pair, and\r
The maximum pair sum is minimized.\r
\r
\r
Return the minimized maximum pair sum after optimally pairing up the elements.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [3,5,2,3]\r
**Output**：7\r
**Explanation**：The elements can be paired up into pairs (3,3) and (5,2).\r
The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [3,5,4,2,4,6]\r
**Output**：8\r
**Explanation**：The elements can be paired up into pairs (3,5), (4,4), and (6,2).\r
The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.\r
\r
\r
\r
**Constraints**：\r
\r
\r
n == nums.length\r
2 <= n $\le 105$\r
n is even.\r
1 <= nums[i] $\le 105$\r
