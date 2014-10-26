# Bitwise Or Of Adjacent Elements

- **LeetCode**：[#3173 Bitwise Or Of Adjacent Elements](https://leetcode.com/problems/bitwise-or-of-adjacent-elements/)
- **难度**：Easy
- **标签**：Bit Manipulation · Array

## 题目

Given an array nums of length n, return an array answer of length n - 1 such that answer[i] = nums[i] | nums[i + 1] where | is the bitwise OR operation.

**Example 1**：

**Input**：nums = [1,3,7,15]
**Output**：[3,7,15]

**Example 2**：

**Input**：nums = [8,4,2]
**Output**：[12,6]

**Example 3**：

**Input**：nums = [5,4,9,11]
**Output**：[5,13,11]


**Constraints**：

2 $\le \mathrm{len}(nums)$ $\le 100$
0 <= nums[i] $\le 100$
