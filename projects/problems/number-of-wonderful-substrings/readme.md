# Number Of Wonderful Substrings

- **LeetCode**：[#1915 Number Of Wonderful Substrings](https://leetcode.com/problems/number-of-wonderful-substrings/)
- **难度**：Medium
- **标签**：Bit Manipulation · Hash Table · String · Prefix Sum

## 题目

A wonderful string is a string where at most one letter appears an odd number of times.\r
\r
\r
For example, "ccjjc" and "abab" are wonderful, but "ab" is not.\r
\r
\r
Given a string word that consists of the first ten lowercase English letters ('a' through 'j'), return the number of wonderful non-empty substrings in word. If the same substring appears multiple times in word, then count each occurrence separately.\r
\r
A substring is a contiguous sequence of characters in a string.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：word = "aba"\r
**Output**：4\r
**Explanation**：The four wonderful substrings are underlined below:\r
- "aba" -> "a"\r
- "aba" -> "b"\r
- "aba" -> "a"\r
- "aba" -> "aba"\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：word = "aabb"\r
**Output**：9\r
**Explanation**：The nine wonderful substrings are underlined below:\r
- "aabb" -> "a"\r
- "aabb" -> "aa"\r
- "aabb" -> "aab"\r
- "aabb" -> "aabb"\r
- "aabb" -> "a"\r
- "aabb" -> "abb"\r
- "aabb" -> "b"\r
- "aabb" -> "bb"\r
- "aabb" -> "b"\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：word = "he"\r
**Output**：2\r
**Explanation**：The two wonderful substrings are underlined below:\r
- "he" -> "h"\r
- "he" -> "e"\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(word)$ $\le 105$\r
word consists of lowercase English letters from 'a' to 'j'.\r
