# Index Pairs Of A String

- **LeetCode**：[#1065 Index Pairs Of A String](https://leetcode.com/problems/index-pairs-of-a-string/)
- **难度**：Easy
- **标签**：Trie · Array · String · Sorting

## 题目

Given a string text and an array of strings words, return an array of all index pairs [i, j] so that the substring text[i...j] is in words.
Return the pairs [i, j] in sorted order (i.e., sort them by their first coordinate, and in case of ties sort them by their second coordinate).

**Example 1**：

**Input**：text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
**Output**：[[3,7],[9,13],[10,17]]

**Example 2**：

**Input**：text = "ababa", words = ["aba","ab"]
**Output**：[[0,1],[0,2],[2,3],[2,4]]
**Explanation**：Notice that matches can overlap, see "aba" is found in [0,2] and [2,4].


**Constraints**：

1 $\le \mathrm{len}(text)$ $\le 100$
1 $\le \mathrm{len}(words)$ $\le 20$
1 <= words[i].length $\le 50$
text and words[i] consist of lowercase English letters.
All the strings of words are unique.
