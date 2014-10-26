# Word Break

- **LeetCode**：[#139 Word Break](https://leetcode.com/problems/word-break/)
- **难度**：Medium
- **标签**：Trie · Memoization · Array · Hash Table · String · Dynamic Programming

## 题目

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Example 1**：

**Input**：s = "leetcode", wordDict = ["leet","code"]
**Output**：true
**Explanation**：Return true because "leetcode" can be segmented as "leet code".

**Example 2**：

**Input**：s = "applepenapple", wordDict = ["apple","pen"]
**Output**：true
**Explanation**：Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

**Example 3**：

**Input**：s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
**Output**：false


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 300$
1 $\le \mathrm{len}(wordDict)$ $\le 1000$
1 <= wordDict[i].length $\le 20$
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
