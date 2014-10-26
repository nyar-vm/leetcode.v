# Number Of Matching Subsequences

- **LeetCode**：[#792 Number Of Matching Subsequences](https://leetcode.com/problems/number-of-matching-subsequences/)
- **难度**：Medium
- **标签**：Trie · Array · Hash Table · String · Binary Search · Dynamic Programming · Sorting

## 题目

Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".


**Example 1**：

**Input**：s = "abcde", words = ["a","bb","acd","ace"]
**Output**：3
**Explanation**：There are three strings in words that are a subsequence of s: "a", "acd", "ace".

**Example 2**：

**Input**：s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
**Output**：2


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 5$ * 104
1 $\le \mathrm{len}(words)$ $\le 5000$
1 <= words[i].length $\le 50$
s and words[i] consist of only lowercase English letters.
