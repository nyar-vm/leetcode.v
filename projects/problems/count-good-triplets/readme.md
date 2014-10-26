# Count Good Triplets

- **LeetCode**：[#1534 Count Good Triplets](https://leetcode.com/problems/count-good-triplets/)
- **难度**：Easy
- **标签**：Array · Enumeration

## 题目

Given an array of integers arr, and three integers a, b and c. You need to find the number of good triplets.\r
\r
A triplet (arr[i], arr[j], arr[k]) is good if the following conditions are true:\r
\r
\r
0 <= i < j < k < arr.length\r
|arr[i] - arr[j]| <= a\r
|arr[j] - arr[k]| <= b\r
|arr[i] - arr[k]| <= c\r
\r
\r
Where |x| denotes the absolute value of x.\r
\r
Return the number of good triplets.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3\r
**Output**：4\r
**Explanation**：There are 4 good triplets: [(3,0,1), (3,0,1), (3,1,1), (0,1,1)].\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：arr = [1,1,2,2,3], a = 0, b = 0, c = 1\r
**Output**：0\r
**Explanation**：No triplet satisfies all conditions.\r
\r
\r
\r
**Constraints**：\r
\r
\r
3 $\le \mathrm{len}(arr)$ $\le 100$\r
0 <= arr[i] $\le 1000$\r
0 <= a, b, c $\le 1000$\r
