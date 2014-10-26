# Sort Transformed Array

- **LeetCode**：[#360 Sort Transformed Array](https://leetcode.com/problems/sort-transformed-array/)
- **难度**：Medium
- **标签**：Array · Math · Two Pointers · Sorting

## 题目

Given a sorted integer array nums and three integers a, b and c, apply a quadratic function of the form f(x) = ax2 + bx + c to each element nums[i] in the array, and return the array in a sorted order.

**Example 1**：
**Input**：nums = [-4,-2,2,4], a = 1, b = 3, c = 5
**Output**：[3,9,15,33]
**Example 2**：
**Input**：nums = [-4,-2,2,4], a = -1, b = 3, c = 5
**Output**：[-23,-5,1,7]


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 200$
-100 <= nums[i], a, b, c $\le 100$
nums is sorted in ascending order.


Follow up: Could you solve it in $O(n)$ time?
