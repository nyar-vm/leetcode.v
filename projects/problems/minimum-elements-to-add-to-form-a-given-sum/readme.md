# Minimum Elements To Add To Form A Given Sum

- **LeetCode**：[#1785 Minimum Elements To Add To Form A Given Sum](https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum/)
- **难度**：Medium
- **标签**：Greedy · Array

## 题目

You are given an integer array nums and two integers limit and goal. The array nums has an interesting property that abs(nums[i]) <= limit.
Return the minimum number of elements you need to add to make the sum of the array equal to goal. The array must maintain its property that abs(nums[i]) <= limit.
Note that abs(x) equals x if x $\ge 0$, and -x otherwise.

**Example 1**：

**Input**：nums = [1,-1,1], limit = 3, goal = -4
**Output**：2
**Explanation**：You can add -2 and -3, then the sum of the array will be 1 - 1 + 1 - 2 - 3 = -4.

**Example 2**：

**Input**：nums = [1,-10,9,1], limit = 100, goal = 0
**Output**：1


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
1 <= limit $\le 106$
-limit <= nums[i] <= limit
-109 <= goal $\le 109$
