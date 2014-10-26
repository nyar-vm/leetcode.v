# Minimum Number Of Increasing Subsequence To Be Removed

- **LeetCode**：[#3231 Minimum Number Of Increasing Subsequence To Be Removed](https://leetcode.com/problems/minimum-number-of-increasing-subsequence-to-be-removed/)
- **难度**：Hard
- **标签**：Array · Binary Search

## 题目

Given an array of integers nums, you are allowed to perform the following operation any number of times:

Remove a strictly increasing subsequence from the array.

Your task is to find the minimum number of operations required to make the array empty.

**Example 1**：

**Input**：nums = [5,3,1,4,2]
**Output**：3
**Explanation**：
We remove subsequences [1, 2], [3, 4], [5].

**Example 2**：

**Input**：nums = [1,2,3,4,5]
**Output**：1

**Example 3**：

**Input**：nums = [5,4,3,2,1]
**Output**：5


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
1 <= nums[i] $\le 105$
