# Find Distance In A Binary Tree

- **LeetCode**：[#1740 Find Distance In A Binary Tree](https://leetcode.com/problems/find-distance-in-a-binary-tree/)
- **难度**：Medium
- **标签**：Tree · Depth-First Search · Breadth-First Search · Hash Table · Binary Tree

## 题目

Given the root of a binary tree and two integers p and q, return the distance between the nodes of value p and value q in the tree.
The distance between two nodes is the number of edges on the path from one to the other.

**Example 1**：


**Input**：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 0
**Output**：3
**Explanation**：There are 3 edges between 5 and 0: 5-3-1-0.
**Example 2**：


**Input**：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 7
**Output**：2
**Explanation**：There are 2 edges between 5 and 7: 5-2-7.
**Example 3**：


**Input**：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 5
**Output**：0
**Explanation**：The distance between a node and itself is 0.

**Constraints**：

The number of nodes in the tree is in the range [1, 104].
0 <= Node.val $\le 109$
All Node.val are unique.
p and q are values in the tree.
