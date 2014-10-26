# Subsequence Of Size K With The Largest Even Sum

- **LeetCode**：[#2098 Subsequence Of Size K With The Largest Even Sum](https://leetcode.com/problems/subsequence-of-size-k-with-the-largest-even-sum/)
- **难度**：Medium
- **标签**：Greedy · Array · Sorting

## 题目

You are given an integer array nums and an integer k. Find the largest even sum of any subsequence of nums that has a length of k.
Return this sum, or -1 if such a sum does not exist.
A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Example 1**：

**Input**：nums = [4,1,5,3,1], k = 3
**Output**：12
**Explanation**：
The subsequence with the largest possible even sum is [4,5,3]. It has a sum of 4 + 5 + 3 = 12.

**Example 2**：

**Input**：nums = [4,6,2], k = 3
**Output**：12
**Explanation**：
The subsequence with the largest possible even sum is [4,6,2]. It has a sum of 4 + 6 + 2 = 12.

**Example 3**：

**Input**：nums = [1,3,5], k = 1
**Output**：-1
**Explanation**：
No subsequence of nums with length 1 has an even sum.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
0 <= nums[i] $\le 105$
1 <= k $\le \mathrm{len}(nums)$
