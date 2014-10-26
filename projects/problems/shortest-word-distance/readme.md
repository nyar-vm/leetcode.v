# Shortest Word Distance

- **LeetCode**：[#243 Shortest Word Distance](https://leetcode.com/problems/shortest-word-distance/)
- **难度**：Easy
- **标签**：Array · String

## 题目

Given an array of strings wordsDict and two different strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.

**Example 1**：

**Input**：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
**Output**：3

**Example 2**：

**Input**：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
**Output**：1


**Constraints**：

2 $\le \mathrm{len}(wordsDict)$ $\le 3$ * 104
1 <= wordsDict[i].length $\le 10$
wordsDict[i] consists of lowercase English letters.
word1 and word2 are in wordsDict.
word1 != word2
