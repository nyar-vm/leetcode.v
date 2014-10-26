# Count Negative Numbers In A Sorted Matrix

- **LeetCode**：[#1351 Count Negative Numbers In A Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/)
- **难度**：Easy
- **标签**：Array · Binary Search · Matrix

## 题目

Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.

**Example 1**：

**Input**：grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
**Output**：8
**Explanation**：There are 8 negatives number in the matrix.

**Example 2**：

**Input**：grid = [[3,2],[1,0]]
**Output**：0


**Constraints**：

m == grid.length
n == grid[i].length
1 <= m, n $\le 100$
-100 <= grid[i][j] $\le 100$


Follow up: Could you find an O(n + m) solution?
