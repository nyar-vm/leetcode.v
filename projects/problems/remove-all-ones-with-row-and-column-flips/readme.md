# Remove All Ones With Row And Column Flips

- **LeetCode**：[#2128 Remove All Ones With Row And Column Flips](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips/)
- **难度**：Medium
- **标签**：Bit Manipulation · Array · Math · Matrix

## 题目

You are given an m x n binary matrix grid.
In one operation, you can choose any row or column and flip each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).
Return true if it is possible to remove all 1's from grid using any number of operations or false otherwise.

**Example 1**：


**Input**：grid = [[0,1,0],[1,0,1],[0,1,0]]
**Output**：true
**Explanation**：One possible way to remove all 1's from grid is to:
- Flip the middle row
- Flip the middle column

**Example 2**：


**Input**：grid = [[1,1,0],[0,0,0],[0,0,0]]
**Output**：false
**Explanation**：It is impossible to remove all 1's from grid.

**Example 3**：


**Input**：grid = [[0]]
**Output**：true
**Explanation**：There are no 1's in grid.


**Constraints**：

m == grid.length
n == grid[i].length
1 <= m, n $\le 300$
grid[i][j] is either 0 or 1.
