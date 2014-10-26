# Longest Continuous Subarray With Absolute Diff Less Than Or Equal To Limit

- **LeetCode**：[#1438 Longest Continuous Subarray With Absolute Diff Less Than Or Equal To Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)
- **难度**：Medium
- **标签**：Queue · Array · Ordered Set · Sliding Window · Monotonic Queue · Heap (Priority Queue)

## 题目

Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.

**Example 1**：

**Input**：nums = [8,2,4,7], limit = 4
**Output**：2
**Explanation**：All subarrays are:
[8] with maximum absolute diff |8-8| = 0 $\le 4$.
[8,2] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 $\le 4$.
[2,4] with maximum absolute diff |2-4| = 2 $\le 4$.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 $\le 4$.
[4,7] with maximum absolute diff |4-7| = 3 $\le 4$.
[7] with maximum absolute diff |7-7| = 0 $\le 4$.
Therefore, the size of the longest subarray is 2.

**Example 2**：

**Input**：nums = [10,1,2,4,7,2], limit = 5
**Output**：4
**Explanation**：The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 $\le 5$.

**Example 3**：

**Input**：nums = [4,2,2,2,4,4,2,2], limit = 0
**Output**：3


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
1 <= nums[i] $\le 109$
0 <= limit $\le 109$
