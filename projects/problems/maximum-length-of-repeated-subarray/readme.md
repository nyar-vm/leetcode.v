# Maximum Length Of Repeated Subarray

- **LeetCode**：[#718 Maximum Length Of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/)
- **难度**：Medium
- **标签**：Array · Binary Search · Dynamic Programming · Sliding Window · Hash Function · Rolling Hash

## 题目

Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

**Example 1**：

**Input**：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
**Output**：3
**Explanation**：The repeated subarray with maximum length is [3,2,1].

**Example 2**：

**Input**：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
**Output**：5
**Explanation**：The repeated subarray with maximum length is [0,0,0,0,0].


**Constraints**：

1 $\le \mathrm{len}(nums1)$, nums2.length $\le 1000$
0 <= nums1[i], nums2[i] $\le 100$
