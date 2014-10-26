# Count Subtrees With Max Distance Between Cities

- **LeetCode**：[#1617 Count Subtrees With Max Distance Between Cities](https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities/)
- **难度**：Hard
- **标签**：Bit Manipulation · Tree · Dynamic Programming · Bitmask · Enumeration

## 题目

There are n cities numbered from 1 to n. You are given an array edges of size n-1, where edges[i] = [ui, vi] represents a bidirectional edge between cities ui and vi. There exists a unique path between each pair of cities. In other words, the cities form a tree.\r
\r
A subtree is a subset of cities where every city is reachable from every other city in the subset, where the path between each pair passes through only the cities from the subset. Two subtrees are different if there is a city in one subtree that is not present in the other.\r
\r
For each d from 1 to n-1, find the number of subtrees in which the maximum distance between any two cities in the subtree is equal to d.\r
\r
Return an array of size n-1 where the dth element (1-indexed) is the number of subtrees in which the maximum distance between any two cities is equal to d.\r
\r
Notice that the distance between the two cities is the number of edges in the path between them.\r
\r
\r
**Example 1**：\r
\r
\r
\r
\r
**Input**：n = 4, edges = [[1,2],[2,3],[2,4]]\r
**Output**：[3,4,0]\r
**Explanation**：\r
The subtrees with subsets {1,2}, {2,3} and {2,4} have a max distance of 1.\r
The subtrees with subsets {1,2,3}, {1,2,4}, {2,3,4} and {1,2,3,4} have a max distance of 2.\r
No subtree has two nodes where the max distance between them is 3.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：n = 2, edges = [[1,2]]\r
**Output**：[1]\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：n = 3, edges = [[1,2],[2,3]]\r
**Output**：[2,1]\r
\r
\r
\r
**Constraints**：\r
\r
\r
2 <= n $\le 15$\r
edges.length == n-1\r
edges[i].length == 2\r
1 <= ui, vi <= n\r
All pairs (ui, vi) are distinct.\r
