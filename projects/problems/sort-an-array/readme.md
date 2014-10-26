# Sort An Array

- **LeetCode**：[#912 Sort An Array](https://leetcode.com/problems/sort-an-array/)
- **难度**：Medium
- **标签**：Array · Divide and Conquer · Bucket Sort · Counting Sort · Radix Sort · Sorting · Heap (Priority Queue) · Merge Sort

## 题目

Given an array of integers nums, sort the array in ascending order and return it.
You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

**Example 1**：

**Input**：nums = [5,2,3,1]
**Output**：[1,2,3,5]
**Explanation**：After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

**Example 2**：

**Input**：nums = [5,1,1,2,0,0]
**Output**：[0,0,1,1,2,5]
**Explanation**：Note that the values of nums are not necessairly unique.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 5$ * 104
-5 * 104 <= nums[i] $\le 5$ * 104
