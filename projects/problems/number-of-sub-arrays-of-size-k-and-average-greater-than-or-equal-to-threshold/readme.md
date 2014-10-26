# Number Of Sub Arrays Of Size K And Average Greater Than Or Equal To Threshold

- **LeetCode**：[#1343 Number Of Sub Arrays Of Size K And Average Greater Than Or Equal To Threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/)
- **难度**：Medium
- **标签**：Array · Sliding Window

## 题目

Given an array of integers arr and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.

**Example 1**：

**Input**：arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
**Output**：3
**Explanation**：Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).

**Example 2**：

**Input**：arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
**Output**：6
**Explanation**：The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.


**Constraints**：

1 $\le \mathrm{len}(arr)$ $\le 105$
1 <= arr[i] $\le 104$
1 <= k $\le \mathrm{len}(arr)$
0 <= threshold $\le 104$
