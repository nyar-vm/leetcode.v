# Find The Minimum Area To Cover All Ones I

- **LeetCode**：[#3195 Find The Minimum Area To Cover All Ones I](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i/)
- **难度**：Medium
- **标签**：Array · Matrix

## 题目

You are given a 2D binary array grid. Find a rectangle with horizontal and vertical sides with the smallest area, such that all the 1's in grid lie inside this rectangle.
Return the minimum possible area of the rectangle.

**Example 1**：

**Input**：grid = [[0,1,0],[1,0,1]]
**Output**：6
**Explanation**：

The smallest rectangle has a height of 2 and a width of 3, so it has an area of 2 * 3 = 6.

**Example 2**：

**Input**：grid = [[1,0],[0,0]]
**Output**：1
**Explanation**：

The smallest rectangle has both height and width 1, so its area is 1 * 1 = 1.


**Constraints**：

1 $\le \mathrm{len}(grid)$, grid[i].length $\le 1000$
grid[i][j] is either 0 or 1.
The input is generated such that there is at least one 1 in grid.
