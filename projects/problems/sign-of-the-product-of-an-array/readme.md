# Sign Of The Product Of An Array

- **LeetCode**：[#1822 Sign Of The Product Of An Array](https://leetcode.com/problems/sign-of-the-product-of-an-array/)
- **难度**：Easy
- **标签**：Array · Math

## 题目

Implement a function signFunc(x) that returns:

1 if x is positive.
-1 if x is negative.
0 if x is equal to 0.

You are given an integer array nums. Let product be the product of all values in the array nums.
Return signFunc(product).

**Example 1**：

**Input**：nums = [-1,-2,-3,-4,3,2,1]
**Output**：1
**Explanation**：The product of all values in the array is 144, and signFunc(144) = 1

**Example 2**：

**Input**：nums = [1,5,0,2,-3]
**Output**：0
**Explanation**：The product of all values in the array is 0, and signFunc(0) = 0

**Example 3**：

**Input**：nums = [-1,1,-1,1,-1]
**Output**：-1
**Explanation**：The product of all values in the array is -1, and signFunc(-1) = -1


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 1000$
-100 <= nums[i] $\le 100$
