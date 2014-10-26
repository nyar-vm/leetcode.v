# Find The Index Of Permutation

- **LeetCode**：[#3109 Find The Index Of Permutation](https://leetcode.com/problems/find-the-index-of-permutation/)
- **难度**：Medium
- **标签**：Binary Indexed Tree · Segment Tree · Array · Binary Search · Divide and Conquer · Ordered Set · Merge Sort

## 题目

Given an array perm of length n which is a permutation of [1, 2, ..., n], return the index of perm in the lexicographically sorted array of all of the permutations of [1, 2, ..., n].
Since the answer may be very large, return it modulo 109 + 7.

**Example 1**：

**Input**：perm = [1,2]
**Output**：0
**Explanation**：
There are only two permutations in the following order:
[1,2], [2,1]

And [1,2] is at index 0.

**Example 2**：

**Input**：perm = [3,1,2]
**Output**：4
**Explanation**：
There are only six permutations in the following order:
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]

And [3,1,2] is at index 4.


**Constraints**：

1 <= n == perm.length $\le 105$
perm is a permutation of [1, 2, ..., n].
