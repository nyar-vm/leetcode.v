# Word Search Ii

- **LeetCode**：[#212 Word Search Ii](https://leetcode.com/problems/word-search-ii/)
- **难度**：Hard
- **标签**：Trie · Array · String · Backtracking · Matrix

## 题目

Given an m x n board of characters and a list of strings words, return all words on the board.
Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Example 1**：


**Input**：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
**Output**：["eat","oath"]

**Example 2**：


**Input**：board = [["a","b"],["c","d"]], words = ["abcb"]
**Output**：[]


**Constraints**：

m == board.length
n == board[i].length
1 <= m, n $\le 12$
board[i][j] is a lowercase English letter.
1 $\le \mathrm{len}(words)$ $\le 3$ * 104
1 <= words[i].length $\le 10$
words[i] consists of lowercase English letters.
All the strings of words are unique.
