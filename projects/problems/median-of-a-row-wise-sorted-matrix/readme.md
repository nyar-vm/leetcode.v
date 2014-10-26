# Median Of A Row Wise Sorted Matrix

- **LeetCode**：[#2387 Median Of A Row Wise Sorted Matrix](https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix/)
- **难度**：Medium
- **标签**：Array · Binary Search · Matrix

## 题目

Given an m x n matrix grid containing an odd number of integers where each row is sorted in non-decreasing order, return the median of the matrix.
You must solve the problem in less than O(m * n) time complexity.

**Example 1**：

**Input**：grid = [[1,1,2],[2,3,3],[1,3,4]]
**Output**：2
**Explanation**：The elements of the matrix in sorted order are 1,1,1,2,2,3,3,3,4. The median is 2.

**Example 2**：

**Input**：grid = [[1,1,3,3,4]]
**Output**：3
**Explanation**：The elements of the matrix in sorted order are 1,1,3,3,4. The median is 3.


**Constraints**：

m == grid.length
n == grid[i].length
1 <= m, n $\le 500$
m and n are both odd.
1 <= grid[i][j] $\le 106$
grid[i] is sorted in non-decreasing order.
