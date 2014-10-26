# Longest Word In Dictionary Through Deleting

- **LeetCode**：[#524 Longest Word In Dictionary Through Deleting](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/)
- **难度**：Medium
- **标签**：Array · Two Pointers · String · Sorting

## 题目

Given a string s and a string array dictionary, return the longest string in the dictionary that can be formed by deleting some of the given string characters. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

**Example 1**：

**Input**：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
**Output**："apple"

**Example 2**：

**Input**：s = "abpcplea", dictionary = ["a","b","c"]
**Output**："a"


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
1 $\le \mathrm{len}(dictionary)$ $\le 1000$
1 <= dictionary[i].length $\le 1000$
s and dictionary[i] consist of lowercase English letters.
