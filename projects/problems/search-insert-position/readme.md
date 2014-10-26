# Search Insert Position

- **LeetCode**：[#35 Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- **难度**：Easy
- **标签**：Array · Binary Search

## 题目

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with $O(\log n)$ runtime complexity.

**Example 1**：

**Input**：nums = [1,3,5,6], target = 5
**Output**：2

**Example 2**：

**Input**：nums = [1,3,5,6], target = 2
**Output**：1

**Example 3**：

**Input**：nums = [1,3,5,6], target = 7
**Output**：4


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 104$
-104 <= nums[i] $\le 104$
nums contains distinct values sorted in ascending order.
-104 <= target $\le 104$
