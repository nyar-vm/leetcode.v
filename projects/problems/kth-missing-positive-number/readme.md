# Kth Missing Positive Number

- **LeetCode**：[#1539 Kth Missing Positive Number](https://leetcode.com/problems/kth-missing-positive-number/)
- **难度**：Easy
- **标签**：Array · Binary Search

## 题目

Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Return the kth positive integer that is missing from this array.

**Example 1**：

**Input**：arr = [2,3,4,7,11], k = 5
**Output**：9
**Explanation**：The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

**Example 2**：

**Input**：arr = [1,2,3,4], k = 2
**Output**：6
**Explanation**：The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.


**Constraints**：

1 $\le \mathrm{len}(arr)$ $\le 1000$
1 <= arr[i] $\le 1000$
1 <= k $\le 1000$
arr[i] < arr[j] for 1 <= i < j $\le \mathrm{len}(arr)$


Follow up:
Could you solve this problem in less than $O(n)$ complexity?
