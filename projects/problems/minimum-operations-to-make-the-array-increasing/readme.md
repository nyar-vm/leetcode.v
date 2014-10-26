# Minimum Operations To Make The Array Increasing

- **LeetCode**：[#1827 Minimum Operations To Make The Array Increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/)
- **难度**：Easy
- **标签**：Greedy · Array

## 题目

You are given an integer array nums (0-indexed). In one operation, you can choose an element of the array and increment it by 1.\r
\r
\r
For example, if nums = [1,2,3], you can choose to increment nums[1] to make nums = [1,3,3].\r
\r
\r
Return the minimum number of operations needed to make nums strictly increasing.\r
\r
An array nums is strictly increasing if nums[i] < nums[i+1] for all 0 <= i < nums.length - 1. An array of length 1 is trivially strictly increasing.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [1,1,1]\r
**Output**：3\r
**Explanation**：You can do the following operations:\r
1) Increment nums[2], so nums becomes [1,1,2].\r
2) Increment nums[1], so nums becomes [1,2,2].\r
3) Increment nums[2], so nums becomes [1,2,3].\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [1,5,2,4,1]\r
**Output**：14\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：nums = [8]\r
**Output**：0\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(nums)$ $\le 5000$\r
1 <= nums[i] $\le 104$\r
