# Construct Binary Tree From String

- **LeetCode**：[#536 Construct Binary Tree From String](https://leetcode.com/problems/construct-binary-tree-from-string/)
- **难度**：Medium
- **标签**：Stack · Tree · Depth-First Search · String · Binary Tree

## 题目

You need to construct a binary tree from a string consisting of parenthesis and integers.
The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child binary tree with the same structure.
You always start to construct the left child node of the parent first if it exists.

**Example 1**：


**Input**：s = "4(2(3)(1))(6(5))"
**Output**：[4,2,6,3,1,5]

**Example 2**：

**Input**：s = "4(2(3)(1))(6(5)(7))"
**Output**：[4,2,6,3,1,5,7]

**Example 3**：

**Input**：s = "-4(2(3)(1))(6(5)(7))"
**Output**：[-4,2,6,3,1,5,7]


**Constraints**：

0 $\le \mathrm{len}(s)$ $\le 3$ * 104
s consists of digits, '(', ')', and '-' only.
All numbers in the tree have value at most than 230.
