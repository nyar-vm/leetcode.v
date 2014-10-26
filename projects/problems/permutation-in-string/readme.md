# Permutation In String

- **LeetCode**：[#567 Permutation In String](https://leetcode.com/problems/permutation-in-string/)
- **难度**：Medium
- **标签**：Hash Table · Two Pointers · String · Sliding Window

## 题目

Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
In other words, return true if one of s1's permutations is the substring of s2.

**Example 1**：

**Input**：s1 = "ab", s2 = "eidbaooo"
**Output**：true
**Explanation**：s2 contains one permutation of s1 ("ba").

**Example 2**：

**Input**：s1 = "ab", s2 = "eidboaoo"
**Output**：false


**Constraints**：

1 $\le \mathrm{len}(s1)$, s2.length $\le 104$
s1 and s2 consist of lowercase English letters.
