# Largest Color Value In A Directed Graph

- **LeetCode**：[#1857 Largest Color Value In A Directed Graph](https://leetcode.com/problems/largest-color-value-in-a-directed-graph/)
- **难度**：Hard
- **标签**：Graph · Topological Sort · Memoization · Hash Table · Dynamic Programming · Counting

## 题目

There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.\r
\r
You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.\r
\r
A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.\r
\r
Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.\r
\r
\r
**Example 1**：\r
\r
\r
\r
\r
**Input**：colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]\r
**Output**：3\r
**Explanation**：The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).\r
\r
\r
**Example 2**：\r
\r
\r
\r
\r
**Input**：colors = "a", edges = [[0,0]]\r
**Output**：-1\r
**Explanation**：There is a cycle from 0 to 0.\r
\r
\r
\r
**Constraints**：\r
\r
\r
n == colors.length\r
m == edges.length\r
1 <= n $\le 105$\r
0 <= m $\le 105$\r
colors consists of lowercase English letters.\r
0 <= aj, bj < n\r
