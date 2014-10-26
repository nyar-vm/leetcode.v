# Alien Dictionary

- **LeetCode**：[#269 Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- **难度**：Hard
- **标签**：Depth-First Search · Breadth-First Search · Graph · Topological Sort · Array · String

## 题目

There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.
You are given a list of strings words from the alien language's dictionary. Now it is claimed that the strings in words are sorted lexicographically by the rules of this new language.
If this claim is incorrect, and the given arrangement of string in words cannot correspond to any order of letters, return "".
Otherwise, return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there are multiple solutions, return any of them.

**Example 1**：

**Input**：words = ["wrt","wrf","er","ett","rftt"]
**Output**："wertf"

**Example 2**：

**Input**：words = ["z","x"]
**Output**："zx"

**Example 3**：

**Input**：words = ["z","x","z"]
**Output**：""
**Explanation**：The order is invalid, so return "".


**Constraints**：

1 $\le \mathrm{len}(words)$ $\le 100$
1 <= words[i].length $\le 100$
words[i] consists of only lowercase English letters.
