# Longest Word In Dictionary

- **LeetCode**：[#720 Longest Word In Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)
- **难度**：Medium
- **标签**：Trie · Array · Hash Table · String · Sorting

## 题目

Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.
If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.
Note that the word should be built from left to right with each additional character being added to the end of a previous word.

**Example 1**：

**Input**：words = ["w","wo","wor","worl","world"]
**Output**："world"
**Explanation**：The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".

**Example 2**：

**Input**：words = ["a","banana","app","appl","ap","apply","apple"]
**Output**："apple"
**Explanation**：Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".


**Constraints**：

1 $\le \mathrm{len}(words)$ $\le 1000$
1 <= words[i].length $\le 30$
words[i] consists of lowercase English letters.
