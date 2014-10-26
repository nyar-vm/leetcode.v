# Count Pairs With Xor In A Range

- **LeetCode**：[#1803 Count Pairs With Xor In A Range](https://leetcode.com/problems/count-pairs-with-xor-in-a-range/)
- **难度**：Hard
- **标签**：Bit Manipulation · Trie · Array

## 题目

Given a (0-indexed) integer array nums and two integers low and high, return the number of nice pairs.\r
\r
A nice pair is a pair (i, j) where 0 <= i < j < nums.length and low <= (nums[i] XOR nums[j]) <= high.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：nums = [1,4,2,7], low = 2, high = 6\r
**Output**：6\r
**Explanation**：All nice pairs (i, j) are as follows:\r
- (0, 1): nums[0] XOR nums[1] = 5 \r
- (0, 2): nums[0] XOR nums[2] = 3\r
- (0, 3): nums[0] XOR nums[3] = 6\r
- (1, 2): nums[1] XOR nums[2] = 6\r
- (1, 3): nums[1] XOR nums[3] = 3\r
- (2, 3): nums[2] XOR nums[3] = 5\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：nums = [9,8,4,2,1], low = 5, high = 14\r
**Output**：8\r
**Explanation**：All nice pairs (i, j) are as follows:\r
​​​​​    - (0, 2): nums[0] XOR nums[2] = 13\r
- (0, 3): nums[0] XOR nums[3] = 11\r
- (0, 4): nums[0] XOR nums[4] = 8\r
- (1, 2): nums[1] XOR nums[2] = 12\r
- (1, 3): nums[1] XOR nums[3] = 10\r
- (1, 4): nums[1] XOR nums[4] = 9\r
- (2, 3): nums[2] XOR nums[3] = 6\r
- (2, 4): nums[2] XOR nums[4] = 5\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(nums)$ $\le 2$ * 104\r
1 <= nums[i] $\le 2$ * 104\r
1 <= low <= high $\le 2$ * 104\r
