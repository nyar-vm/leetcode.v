# Merge K Sorted Lists

- **LeetCode**：[#23 Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **难度**：Hard
- **标签**：Linked List · Divide and Conquer · Heap (Priority Queue) · Merge Sort

## 题目

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

**Example 1**：

**Input**：lists = [[1,4,5],[1,3,4],[2,6]]
**Output**：[1,1,2,3,4,4,5,6]
**Explanation**：The linked-lists are:
[
1->4->5,
1->3->4,
2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

**Example 2**：

**Input**：lists = []
**Output**：[]

**Example 3**：

**Input**：lists = [[]]
**Output**：[]


**Constraints**：

k == lists.length
0 <= k $\le 104$
0 <= lists[i].length $\le 500$
-104 <= lists[i][j] $\le 104$
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
