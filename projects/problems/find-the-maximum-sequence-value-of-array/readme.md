# Find The Maximum Sequence Value Of Array

- **LeetCode**：[#3287 Find The Maximum Sequence Value Of Array](https://leetcode.com/problems/find-the-maximum-sequence-value-of-array/)
- **难度**：Hard
- **标签**：Bit Manipulation · Array · Dynamic Programming

## 题目

You are given an integer array nums and a positive integer k.
The value of a sequence seq of size 2 * x is defined as:

(seq[0] OR seq[1] OR ... OR seq[x - 1]) XOR (seq[x] OR seq[x + 1] OR ... OR seq[2 * x - 1]).

Return the maximum value of any subsequence of nums having size 2 * k.

**Example 1**：

**Input**：nums = [2,6,7], k = 1
**Output**：5
**Explanation**：
The subsequence [2, 7] has the maximum value of 2 XOR 7 = 5.

**Example 2**：

**Input**：nums = [4,2,5,6,7], k = 2
**Output**：2
**Explanation**：
The subsequence [4, 5, 6, 7] has the maximum value of (4 OR 5) XOR (6 OR 7) = 2.


**Constraints**：

2 $\le \mathrm{len}(nums)$ $\le 400$
1 <= nums[i] < 27
1 <= k $\le \mathrm{len}(nums)$ / 2
