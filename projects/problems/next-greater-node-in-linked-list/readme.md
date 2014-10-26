# Next Greater Node In Linked List

- **LeetCode**：[#1019 Next Greater Node In Linked List](https://leetcode.com/problems/next-greater-node-in-linked-list/)
- **难度**：Medium
- **标签**：Stack · Array · Linked List · Monotonic Stack

## 题目

You are given the head of a linked list with n nodes.
For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.
Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

**Example 1**：


**Input**：head = [2,1,5]
**Output**：[5,5,0]

**Example 2**：


**Input**：head = [2,7,4,3,5]
**Output**：[7,0,5,5,0]


**Constraints**：

The number of nodes in the list is n.
1 <= n $\le 104$
1 <= Node.val $\le 109$
