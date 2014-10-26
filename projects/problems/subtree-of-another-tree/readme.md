# Subtree Of Another Tree

- **LeetCode**：[#572 Subtree Of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
- **难度**：Easy
- **标签**：Tree · Depth-First Search · Binary Tree · String Matching · Hash Function

## 题目

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.
A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

**Example 1**：


**Input**：root = [3,4,5,1,2], subRoot = [4,1,2]
**Output**：true

**Example 2**：


**Input**：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
**Output**：false


**Constraints**：

The number of nodes in the root tree is in the range [1, 2000].
The number of nodes in the subRoot tree is in the range [1, 1000].
-104 <= root.val $\le 104$
-104 <= subRoot.val $\le 104$
