# Shortest Word Distance Iii

- **LeetCode**：[#245 Shortest Word Distance Iii](https://leetcode.com/problems/shortest-word-distance-iii/)
- **难度**：Medium
- **标签**：Array · String

## 题目

Given an array of strings wordsDict and two strings that already exist in the array word1 and word2, return the shortest distance between the occurrence of these two words in the list.
Note that word1 and word2 may be the same. It is guaranteed that they represent two individual words in the list.

**Example 1**：
**Input**：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
**Output**：1
**Example 2**：
**Input**：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
**Output**：3


**Constraints**：

1 $\le \mathrm{len}(wordsDict)$ $\le 105$
1 <= wordsDict[i].length $\le 10$
wordsDict[i] consists of lowercase English letters.
word1 and word2 are in wordsDict.
