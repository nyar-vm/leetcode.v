# Intersection Of Three Sorted Arrays

- **LeetCode**：[#1213 Intersection Of Three Sorted Arrays](https://leetcode.com/problems/intersection-of-three-sorted-arrays/)
- **难度**：Easy
- **标签**：Array · Hash Table · Binary Search · Counting

## 题目

Given three integer arrays arr1, arr2 and arr3 sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.

**Example 1**：

**Input**：arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
**Output**：[1,5]
**Explanation**：Only 1 and 5 appeared in the three arrays.

**Example 2**：

**Input**：arr1 = [197,418,523,876,1356], arr2 = [501,880,1593,1710,1870], arr3 = [521,682,1337,1395,1764]
**Output**：[]


**Constraints**：

1 $\le \mathrm{len}(arr1)$, arr2.length, arr3.length $\le 1000$
1 <= arr1[i], arr2[i], arr3[i] $\le 2000$
