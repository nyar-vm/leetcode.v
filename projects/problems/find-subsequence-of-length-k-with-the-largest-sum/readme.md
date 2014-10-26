# Find Subsequence Of Length K With The Largest Sum

- **LeetCode**：[#2099 Find Subsequence Of Length K With The Largest Sum](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/)
- **难度**：Easy
- **标签**：Array · Hash Table · Sorting · Heap (Priority Queue)

## 题目

You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.
Return any such subsequence as an integer array of length k.
A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Example 1**：

**Input**：nums = [2,1,3,3], k = 2
**Output**：[3,3]
**Explanation**：
The subsequence has the largest sum of 3 + 3 = 6.
**Example 2**：

**Input**：nums = [-1,-2,3,4], k = 3
**Output**：[-1,3,4]
**Explanation**：
The subsequence has the largest sum of -1 + 3 + 4 = 6.

**Example 3**：

**Input**：nums = [3,4,3,3], k = 2
**Output**：[3,4]
**Explanation**：
The subsequence has the largest sum of 3 + 4 = 7.
Another possible subsequence is [4, 3].


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 1000$
-105 <= nums[i] $\le 105$
1 <= k $\le \mathrm{len}(nums)$
