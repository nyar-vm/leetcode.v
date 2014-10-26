# Contains Duplicate Ii

- **LeetCode**：[#219 Contains Duplicate Ii](https://leetcode.com/problems/contains-duplicate-ii/)
- **难度**：Easy
- **标签**：Array · Hash Table · Sliding Window

## 题目

Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

**Example 1**：

**Input**：nums = [1,2,3,1], k = 3
**Output**：true

**Example 2**：

**Input**：nums = [1,0,1,1], k = 1
**Output**：true

**Example 3**：

**Input**：nums = [1,2,3,1,2,3], k = 2
**Output**：false


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
-109 <= nums[i] $\le 109$
0 <= k $\le 105$
