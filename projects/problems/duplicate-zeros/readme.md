# Duplicate Zeros

- **LeetCode**：[#1089 Duplicate Zeros](https://leetcode.com/problems/duplicate-zeros/)
- **难度**：Easy
- **标签**：Array · Two Pointers

## 题目

Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.
Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

**Example 1**：

**Input**：arr = [1,0,2,3,0,4,5,0]
**Output**：[1,0,0,2,3,0,0,4]
**Explanation**：After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

**Example 2**：

**Input**：arr = [1,2,3]
**Output**：[1,2,3]
**Explanation**：After calling your function, the input array is modified to: [1,2,3]


**Constraints**：

1 $\le \mathrm{len}(arr)$ $\le 104$
0 <= arr[i] $\le 9$
