# Construct Binary Tree From Inorder And Postorder Traversal

- **LeetCode**：[#106 Construct Binary Tree From Inorder And Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- **难度**：Medium
- **标签**：Tree · Array · Hash Table · Divide and Conquer · Binary Tree

## 题目

Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

**Example 1**：


**Input**：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
**Output**：[3,9,20,null,null,15,7]

**Example 2**：

**Input**：inorder = [-1], postorder = [-1]
**Output**：[-1]


**Constraints**：

1 $\le \mathrm{len}(inorder)$ $\le 3000$
postorder.length == inorder.length
-3000 <= inorder[i], postorder[i] $\le 3000$
inorder and postorder consist of unique values.
Each value of postorder also appears in inorder.
inorder is guaranteed to be the inorder traversal of the tree.
postorder is guaranteed to be the postorder traversal of the tree.
