# Maximum Size Subarray Sum Equals K

- **LeetCode**：[#325 Maximum Size Subarray Sum Equals K](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/)
- **难度**：Medium
- **标签**：Array · Hash Table · Prefix Sum

## 题目

Given an integer array nums and an integer k, return the maximum length of a subarray that sums to k. If there is not one, return 0 instead.

**Example 1**：

**Input**：nums = [1,-1,5,-2,3], k = 3
**Output**：4
**Explanation**：The subarray [1, -1, 5, -2] sums to 3 and is the longest.

**Example 2**：

**Input**：nums = [-2,-1,2,1], k = 1
**Output**：2
**Explanation**：The subarray [-1, 2] sums to 1 and is the longest.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 2$ * 105
-104 <= nums[i] $\le 104$
-109 <= k $\le 109$
