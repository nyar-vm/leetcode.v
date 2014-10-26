# Maximum Width Ramp

- **LeetCode**：[#962 Maximum Width Ramp](https://leetcode.com/problems/maximum-width-ramp/)
- **难度**：Medium
- **标签**：Stack · Array · Two Pointers · Monotonic Stack

## 题目

A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.
Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

**Example 1**：

**Input**：nums = [6,0,8,2,1,5]
**Output**：4
**Explanation**：The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.

**Example 2**：

**Input**：nums = [9,8,1,0,1,9,4,0,4,1]
**Output**：7
**Explanation**：The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.


**Constraints**：

2 $\le \mathrm{len}(nums)$ $\le 5$ * 104
0 <= nums[i] $\le 5$ * 104
