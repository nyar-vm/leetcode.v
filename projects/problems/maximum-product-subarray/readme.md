# Maximum Product Subarray

- **LeetCode**：[#152 Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming

## 题目

Given an integer array nums, find a subarray that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.

**Example 1**：

**Input**：nums = [2,3,-2,4]
**Output**：6
**Explanation**：[2,3] has the largest product 6.

**Example 2**：

**Input**：nums = [-2,0,-1]
**Output**：0
**Explanation**：The result cannot be 2, because [-2,-1] is not a subarray.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 2$ * 104
-10 <= nums[i] $\le 10$
The product of any subarray of nums is guaranteed to fit in a 32-bit integer.
