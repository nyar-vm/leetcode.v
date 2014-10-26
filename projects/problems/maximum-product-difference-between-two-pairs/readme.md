# Maximum Product Difference Between Two Pairs

- **LeetCode**：[#1913 Maximum Product Difference Between Two Pairs](https://leetcode.com/problems/maximum-product-difference-between-two-pairs/)
- **难度**：Easy
- **标签**：Array · Sorting

## 题目

The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).\r
\r
\r
For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.\r
\r
\r
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.\r
\r
Return the maximum such product difference.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [5,6,2,7,4]\r
**Output**：34\r
**Explanation**：We can choose indices 1 and 3 for the first pair (6, 7) and indices 2 and 4 for the second pair (2, 4).\r
The product difference is (6 * 7) - (2 * 4) = 34.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [4,2,5,9,7,4,8]\r
**Output**：64\r
**Explanation**：We can choose indices 3 and 6 for the first pair (9, 8) and indices 1 and 5 for the second pair (2, 4).\r
The product difference is (9 * 8) - (2 * 4) = 64.\r
\r
\r
\r
**Constraints**：\r
\r
\r
4 $\le \mathrm{len}(nums)$ $\le 104$\r
1 <= nums[i] $\le 104$\r
