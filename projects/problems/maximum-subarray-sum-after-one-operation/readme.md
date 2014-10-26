# Maximum Subarray Sum After One Operation

- **LeetCode**：[#1746 Maximum Subarray Sum After One Operation](https://leetcode.com/problems/maximum-subarray-sum-after-one-operation/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming

## 题目

You are given an integer array nums. You must perform exactly one operation where you can replace one element nums[i] with nums[i] * nums[i]. \r
\r
Return the maximum possible subarray sum after exactly one operation. The subarray must be non-empty.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [2,-1,-4,-3]\r
**Output**：17\r
**Explanation**：You can perform the operation on index 2 (0-indexed) to make nums = [2,-1,16,-3]. Now, the maximum subarray sum is 2 + -1 + 16 = 17.\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [1,-1,1,1,-1,-1,1]\r
**Output**：4\r
**Explanation**：You can perform the operation on index 1 (0-indexed) to make nums = [1,1,1,1,-1,-1,1]. Now, the maximum subarray sum is 1 + 1 + 1 + 1 = 4.\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(nums)$ $\le 105$\r
-104 <= nums[i] $\le 104$\r
