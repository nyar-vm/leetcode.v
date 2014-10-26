# Shuffle The Array

- **LeetCode**：[#1470 Shuffle The Array](https://leetcode.com/problems/shuffle-the-array/)
- **难度**：Easy
- **标签**：Array

## 题目

Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].\r
\r
Return the array in the form [x1,y1,x2,y2,...,xn,yn].\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [2,5,1,3,4,7], n = 3\r
**Output**：[2,3,5,4,1,7] \r
**Explanation**：Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [1,2,3,4,4,3,2,1], n = 4\r
**Output**：[1,4,2,3,3,2,4,1]\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：nums = [1,1,2,2], n = 2\r
**Output**：[1,2,1,2]\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 <= n $\le 500$\r
nums.length == 2n\r
1 <= nums[i] <= $10^{3}$\r
