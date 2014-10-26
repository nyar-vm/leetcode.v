# Rotate String

- **LeetCode**：[#796 Rotate String](https://leetcode.com/problems/rotate-string/)
- **难度**：Easy
- **标签**：String · String Matching

## 题目

Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.


**Example 1**：
**Input**：s = "abcde", goal = "cdeab"
**Output**：true
**Example 2**：
**Input**：s = "abcde", goal = "abced"
**Output**：false


**Constraints**：

1 $\le \mathrm{len}(s)$, goal.length $\le 100$
s and goal consist of lowercase English letters.
