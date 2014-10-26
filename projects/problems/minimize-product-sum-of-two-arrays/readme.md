# Minimize Product Sum Of Two Arrays

- **LeetCode**：[#1874 Minimize Product Sum Of Two Arrays](https://leetcode.com/problems/minimize-product-sum-of-two-arrays/)
- **难度**：Medium
- **标签**：Greedy · Array · Sorting

## 题目

The product sum of two equal-length arrays a and b is equal to the sum of a[i] * b[i] for all 0 <= i < a.length (0-indexed).\r
\r
\r
For example, if a = [1,2,3,4] and b = [5,2,3,1], the product sum would be 1*5 + 2*2 + 3*3 + 4*1 = 22.\r
\r
\r
Given two arrays nums1 and nums2 of length n, return the minimum product sum if you are allowed to rearrange the order of the elements in nums1. \r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums1 = [5,3,4,2], nums2 = [4,2,2,5]\r
**Output**：40\r
**Explanation**：We can rearrange nums1 to become [3,5,4,2]. The product sum of [3,5,4,2] and [4,2,2,5] is 3*4 + 5*2 + 4*2 + 2*5 = 40.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums1 = [2,1,4,5,7], nums2 = [3,2,4,8,6]\r
**Output**：65\r
**Explanation**：We can rearrange nums1 to become [5,7,4,1,2]. The product sum of [5,7,4,1,2] and [3,2,4,8,6] is 5*3 + 7*2 + 4*4 + 1*8 + 2*6 = 65.\r
\r
\r
\r
**Constraints**：\r
\r
\r
n == nums1.length == nums2.length\r
1 <= n $\le 105$\r
1 <= nums1[i], nums2[i] $\le 100$\r
