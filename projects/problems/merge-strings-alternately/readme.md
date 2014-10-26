# Merge Strings Alternately

- **LeetCode**：[#1768 Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately/)
- **难度**：Easy
- **标签**：Two Pointers · String

## 题目

You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.\r
\r
Return the merged string.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：word1 = "abc", word2 = "pqr"\r
**Output**："apbqcr"\r
**Explanation**：The merged string will be merged as so:\r
word1:  a   b   c\r
word2:    p   q   r\r
merged: a p b q c r\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：word1 = "ab", word2 = "pqrs"\r
**Output**："apbqrs"\r
**Explanation**：Notice that as word2 is longer, "rs" is appended to the end.\r
word1:  a   b \r
word2:    p   q   r   s\r
merged: a p b q   r   s\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：word1 = "abcd", word2 = "pq"\r
**Output**："apbqcd"\r
**Explanation**：Notice that as word1 is longer, "cd" is appended to the end.\r
word1:  a   b   c   d\r
word2:    p   q \r
merged: a p b q c   d\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(word1)$, word2.length $\le 100$\r
word1 and word2 consist of lowercase English letters.\r
