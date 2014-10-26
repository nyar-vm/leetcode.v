# Find The Maximum Length Of A Good Subsequence Ii

- **LeetCode**：[#3177 Find The Maximum Length Of A Good Subsequence Ii](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii/)
- **难度**：Hard
- **标签**：Array · Hash Table · Dynamic Programming

## 题目

You are given an integer array nums and a non-negative integer k. A sequence of integers seq is called good if there are at most k indices i in the range [0, seq.length - 2] such that seq[i] != seq[i + 1].
Return the maximum possible length of a good subsequence of nums.

**Example 1**：

**Input**：nums = [1,2,1,1,3], k = 2
**Output**：4
**Explanation**：
The maximum length subsequence is [1,2,1,1,3].

**Example 2**：

**Input**：nums = [1,2,3,4,5,1], k = 0
**Output**：2
**Explanation**：
The maximum length subsequence is [1,2,3,4,5,1].


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 5$ * 103
1 <= nums[i] $\le 109$
0 <= k <= min(50, nums.length)
