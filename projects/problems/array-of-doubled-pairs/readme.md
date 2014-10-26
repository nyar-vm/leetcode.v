# Array Of Doubled Pairs

- **LeetCode**：[#954 Array Of Doubled Pairs](https://leetcode.com/problems/array-of-doubled-pairs/)
- **难度**：Medium
- **标签**：Greedy · Array · Hash Table · Sorting

## 题目

Given an integer array of even length arr, return true if it is possible to reorder arr such that arr[2 * i + 1] = 2 * arr[2 * i] for every 0 <= i < len(arr) / 2, or false otherwise.

**Example 1**：

**Input**：arr = [3,1,3,6]
**Output**：false

**Example 2**：

**Input**：arr = [2,1,2,6]
**Output**：false

**Example 3**：

**Input**：arr = [4,-2,2,-4]
**Output**：true
**Explanation**：We can take two groups, [-2,-4] and [2,4] to form [-2,-4,2,4] or [2,4,-2,-4].


**Constraints**：

2 $\le \mathrm{len}(arr)$ $\le 3$ * 104
arr.length is even.
-105 <= arr[i] $\le 105$
