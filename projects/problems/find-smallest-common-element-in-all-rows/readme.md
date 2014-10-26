# Find Smallest Common Element In All Rows

- **LeetCode**：[#1198 Find Smallest Common Element In All Rows](https://leetcode.com/problems/find-smallest-common-element-in-all-rows/)
- **难度**：Medium
- **标签**：Array · Hash Table · Binary Search · Counting · Matrix

## 题目

Given an m x n matrix mat where every row is sorted in strictly increasing order, return the smallest common element in all rows.
If there is no common element, return -1.

**Example 1**：

**Input**：mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
**Output**：5

**Example 2**：

**Input**：mat = [[1,2,3],[2,3,4],[2,3,5]]
**Output**：2


**Constraints**：

m == mat.length
n == mat[i].length
1 <= m, n $\le 500$
1 <= mat[i][j] $\le 104$
mat[i] is sorted in strictly increasing order.
