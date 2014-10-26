# Construct Binary Tree From Preorder And Postorder Traversal

- **LeetCode**：[#889 Construct Binary Tree From Preorder And Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)
- **难度**：Medium
- **标签**：Tree · Array · Hash Table · Divide and Conquer · Binary Tree

## 题目

Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.
If there exist multiple answers, you can return any of them.

**Example 1**：


**Input**：preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
**Output**：[1,2,3,4,5,6,7]

**Example 2**：

**Input**：preorder = [1], postorder = [1]
**Output**：[1]


**Constraints**：

1 $\le \mathrm{len}(preorder)$ $\le 30$
1 <= preorder[i] $\le \mathrm{len}(preorder)$
All the values of preorder are unique.
postorder.length == preorder.length
1 <= postorder[i] $\le \mathrm{len}(postorder)$
All the values of postorder are unique.
It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.
