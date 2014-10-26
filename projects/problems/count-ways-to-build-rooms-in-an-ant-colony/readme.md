# Count Ways To Build Rooms In An Ant Colony

- **LeetCode**：[#1916 Count Ways To Build Rooms In An Ant Colony](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony/)
- **难度**：Hard
- **标签**：Tree · Graph · Topological Sort · Math · Dynamic Programming · Combinatorics

## 题目

You are an ant tasked with adding n new rooms numbered 0 to n-1 to your colony. You are given the expansion plan as a 0-indexed integer array of length n, prevRoom, where prevRoom[i] indicates that you must build room prevRoom[i] before building room i, and these two rooms must be connected directly. Room 0 is already built, so prevRoom[0] = -1. The expansion plan is given such that once all the rooms are built, every room will be reachable from room 0.\r
\r
You can only build one room at a time, and you can travel freely between rooms you have already built only if they are connected. You can choose to build any room as long as its previous room is already built.\r
\r
Return the number of different orders you can build all the rooms in. Since the answer may be large, return it modulo 109 + 7.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：prevRoom = [-1,0,1]\r
**Output**：1\r
**Explanation**：There is only one way to build the additional rooms: 0 → 1 → 2\r
\r
\r
**Example 2**：\r
\r
\r
\r
**Input**：prevRoom = [-1,0,0,1,2]\r
**Output**：6\r
**Explanation**：\r
The 6 ways are:\r
0 → 1 → 3 → 2 → 4\r
0 → 2 → 4 → 1 → 3\r
0 → 1 → 2 → 3 → 4\r
0 → 1 → 2 → 4 → 3\r
0 → 2 → 1 → 3 → 4\r
0 → 2 → 1 → 4 → 3\r
\r
\r
\r
**Constraints**：\r
\r
\r
n == prevRoom.length\r
2 <= n $\le 105$\r
prevRoom[0] == -1\r
0 <= prevRoom[i] < n for all 1 <= i < n\r
Every room is reachable from room 0 once all the rooms are built.\r
