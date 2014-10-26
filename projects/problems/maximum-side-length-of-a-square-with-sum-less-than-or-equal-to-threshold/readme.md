# Maximum Side Length Of A Square With Sum Less Than Or Equal To Threshold

- **LeetCode**：[#1292 Maximum Side Length Of A Square With Sum Less Than Or Equal To Threshold](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)
- **难度**：Medium
- **标签**：Array · Binary Search · Matrix · Prefix Sum

## 题目

Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.

**Example 1**：


**Input**：mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
**Output**：2
**Explanation**：The maximum side length of square with sum less than 4 is 2 as shown.

**Example 2**：

**Input**：mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
**Output**：0


**Constraints**：

m == mat.length
n == mat[i].length
1 <= m, n $\le 300$
0 <= mat[i][j] $\le 104$
0 <= threshold $\le 105$
