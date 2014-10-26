# Check If There Is A Path With Equal Number Of 0s And 1s

- **LeetCode**：[#2510 Check If There Is A Path With Equal Number Of 0s And 1s](https://leetcode.com/problems/check-if-there-is-a-path-with-equal-number-of-0s-and-1s/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming · Matrix

## 题目

You are given a 0-indexed m x n binary matrix grid. You can move from a cell (row, col) to any of the cells (row + 1, col) or (row, col + 1).
Return true if there is a path from (0, 0) to (m - 1, n - 1) that visits an equal number of 0's and 1's. Otherwise return false.

**Example 1**：


**Input**：grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
**Output**：true
**Explanation**：The path colored in blue in the above diagram is a valid path because we have 3 cells with a value of 1 and 3 with a value of 0. Since there is a valid path, we return true.

**Example 2**：


**Input**：grid = [[1,1,0],[0,0,1],[1,0,0]]
**Output**：false
**Explanation**：There is no path in this grid with an equal number of 0's and 1's.


**Constraints**：

m == grid.length
n == grid[i].length
2 <= m, n $\le 100$
grid[i][j] is either 0 or 1.
