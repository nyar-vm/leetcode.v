# Contains Duplicate Iii

- **LeetCode**：[#220 Contains Duplicate Iii](https://leetcode.com/problems/contains-duplicate-iii/)
- **难度**：Hard
- **标签**：Array · Bucket Sort · Ordered Set · Sorting · Sliding Window

## 题目

You are given an integer array nums and two integers indexDiff and valueDiff.
Find a pair of indices (i, j) such that:

i != j,
abs(i - j) <= indexDiff.
abs(nums[i] - nums[j]) <= valueDiff, and

Return true if such pair exists or false otherwise.

**Example 1**：

**Input**：nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
**Output**：true
**Explanation**：We can choose (i, j) = (0, 3).
We satisfy the three conditions:
i != j --> 0 != 3
abs(i - j) <= indexDiff --> abs(0 - 3) $\le 3$
abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) $\le 0$

**Example 2**：

**Input**：nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
**Output**：false
**Explanation**：After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.


**Constraints**：

2 $\le \mathrm{len}(nums)$ $\le 105$
-109 <= nums[i] $\le 109$
1 <= indexDiff $\le \mathrm{len}(nums)$
0 <= valueDiff $\le 109$
