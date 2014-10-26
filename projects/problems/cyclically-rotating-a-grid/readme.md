# Cyclically Rotating A Grid

- **LeetCode**：[#1914 Cyclically Rotating A Grid](https://leetcode.com/problems/cyclically-rotating-a-grid/)
- **难度**：Medium
- **标签**：Array · Matrix · Simulation

## 题目

You are given an m x n integer matrix grid​​​, where m and n are both even integers, and an integer k.\r
\r
The matrix is composed of several layers, which is shown in the below image, where each color is its own layer:\r
\r
\r
\r
A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the counter-clockwise direction. An example rotation is shown below:\r
\r
Return the matrix after applying k cyclic rotations to it.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：grid = [[40,10],[30,20]], k = 1\r
**Output**：[[10,20],[40,30]]\r
**Explanation**：The figures above represent the grid at every state.\r
\r
\r
**Example 2**：\r
\r
\r
\r
**Input**：grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2\r
**Output**：[[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]\r
**Explanation**：The figures above represent the grid at every state.\r
\r
\r
\r
**Constraints**：\r
\r
\r
m == grid.length\r
n == grid[i].length\r
2 <= m, n $\le 50$\r
Both m and n are even integers.\r
1 <= grid[i][j] $\le 5000$\r
1 <= k $\le 109$\r
