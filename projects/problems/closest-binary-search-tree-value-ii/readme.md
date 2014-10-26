# Closest Binary Search Tree Value Ii

- **LeetCode**：[#272 Closest Binary Search Tree Value Ii](https://leetcode.com/problems/closest-binary-search-tree-value-ii/)
- **难度**：Hard
- **标签**：Stack · Tree · Depth-First Search · Binary Search Tree · Two Pointers · Binary Tree · Heap (Priority Queue)

## 题目

Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order.
You are guaranteed to have only one unique set of k values in the BST that are closest to the target.

**Example 1**：


**Input**：root = [4,2,5,1,3], target = 3.714286, k = 2
**Output**：[4,3]

**Example 2**：

**Input**：root = [1], target = 0.000000, k = 1
**Output**：[1]


**Constraints**：

The number of nodes in the tree is n.
1 <= k <= n $\le 104$.
0 <= Node.val $\le 109$
-109 <= target $\le 109$


Follow up: Assume that the BST is balanced. Could you solve it in less than $O(n)$ runtime (where n = total nodes)?
