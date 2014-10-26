# Longest Repeating Substring

- **LeetCode**：[#1062 Longest Repeating Substring](https://leetcode.com/problems/longest-repeating-substring/)
- **难度**：Medium
- **标签**：String · Binary Search · Dynamic Programming · Suffix Array · Hash Function · Rolling Hash

## 题目

Given a string s, return the length of the longest repeating substrings. If no repeating substring exists, return 0.

**Example 1**：

**Input**：s = "abcd"
**Output**：0
**Explanation**：There is no repeating substring.

**Example 2**：

**Input**：s = "abbaba"
**Output**：2
**Explanation**：The longest repeating substrings are "ab" and "ba", each of which occurs twice.

**Example 3**：

**Input**：s = "aabcaabdaab"
**Output**：3
**Explanation**：The longest repeating substring is "aab", which occurs 3 times.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 2000$
s consists of lowercase English letters.
