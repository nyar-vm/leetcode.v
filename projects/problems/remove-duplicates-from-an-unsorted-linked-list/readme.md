# Remove Duplicates From An Unsorted Linked List

- **LeetCode**：[#1836 Remove Duplicates From An Unsorted Linked List](https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/)
- **难度**：Medium
- **标签**：Hash Table · Linked List

## 题目

Given the head of a linked list, find all the values that appear more than once in the list and delete the nodes that have any of those values.\r
\r
Return the linked list after the deletions.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：head = [1,2,3,2]\r
**Output**：[1,3]\r
**Explanation**：2 appears twice in the linked list, so all 2's should be deleted. After deleting all 2's, we are left with [1,3].\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：head = [2,1,1,2]\r
**Output**：[]\r
**Explanation**：2 and 1 both appear twice. All the elements should be deleted.\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：head = [3,2,2,1,3,2,4]\r
**Output**：[1,4]\r
**Explanation**：3 appears twice and 2 appears three times. After deleting all 3's and 2's, we are left with [1,4].\r
\r
\r
\r
**Constraints**：\r
\r
\r
The number of nodes in the list is in the range [1, 105]\r
1 <= Node.val $\le 105$\r
