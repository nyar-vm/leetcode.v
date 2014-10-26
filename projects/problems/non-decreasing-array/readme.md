# Non Decreasing Array

- **LeetCode**：[#665 Non Decreasing Array](https://leetcode.com/problems/non-decreasing-array/)
- **难度**：Medium
- **标签**：Array

## 题目

Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.
We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).

**Example 1**：

**Input**：nums = [4,2,3]
**Output**：true
**Explanation**：You could modify the first 4 to 1 to get a non-decreasing array.

**Example 2**：

**Input**：nums = [4,2,1]
**Output**：false
**Explanation**：You cannot get a non-decreasing array by modifying at most one element.


**Constraints**：

n == nums.length
1 <= n $\le 104$
-105 <= nums[i] $\le 105$
