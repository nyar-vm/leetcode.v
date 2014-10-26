# Shortest Subarray With Sum At Least K

- **LeetCode**：[#862 Shortest Subarray With Sum At Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/)
- **难度**：Hard
- **标签**：Queue · Array · Binary Search · Prefix Sum · Sliding Window · Monotonic Queue · Heap (Priority Queue)

## 题目

Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.
A subarray is a contiguous part of an array.

**Example 1**：
**Input**：nums = [1], k = 1
**Output**：1
**Example 2**：
**Input**：nums = [1,2], k = 4
**Output**：-1
**Example 3**：
**Input**：nums = [2,-1,2], k = 3
**Output**：3


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
-105 <= nums[i] $\le 105$
1 <= k $\le 109$
