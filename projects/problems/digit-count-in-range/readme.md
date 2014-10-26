# Digit Count In Range

- **LeetCode**：[#1067 Digit Count In Range](https://leetcode.com/problems/digit-count-in-range/)
- **难度**：Hard
- **标签**：Math · Dynamic Programming

## 题目

Given a single-digit integer d and two integers low and high, return the number of times that d occurs as a digit in all integers in the inclusive range [low, high].

**Example 1**：

**Input**：d = 1, low = 1, high = 13
**Output**：6
**Explanation**：The digit d = 1 occurs 6 times in 1, 10, 11, 12, 13.
Note that the digit d = 1 occurs twice in the number 11.

**Example 2**：

**Input**：d = 3, low = 100, high = 250
**Output**：35
**Explanation**：The digit d = 3 occurs 35 times in 103,113,123,130,131,...,238,239,243.


**Constraints**：

0 <= d $\le 9$
1 <= low <= high $\le 2$ * 108
