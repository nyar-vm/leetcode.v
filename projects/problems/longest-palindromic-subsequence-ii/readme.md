# Longest Palindromic Subsequence Ii

- **LeetCode**：[#1682 Longest Palindromic Subsequence Ii](https://leetcode.com/problems/longest-palindromic-subsequence-ii/)
- **难度**：Medium
- **标签**：String · Dynamic Programming

## 题目

A subsequence of a string s is considered a good palindromic subsequence if:

It is a subsequence of s.
It is a palindrome (has the same value if reversed).
It has an even length.
No two consecutive characters are equal, except the two middle ones.

For example, if s = "abcabcabb", then "abba" is considered a good palindromic subsequence, while "bcb" (not even length) and "bbbb" (has equal consecutive characters) are not.
Given a string s, return the length of the longest good palindromic subsequence in s.

**Example 1**：

**Input**：s = "bbabab"
**Output**：4
**Explanation**：The longest good palindromic subsequence of s is "baab".

**Example 2**：

**Input**：s = "dcbccacdb"
**Output**：4
**Explanation**：The longest good palindromic subsequence of s is "dccd".


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 250$
s consists of lowercase English letters.
