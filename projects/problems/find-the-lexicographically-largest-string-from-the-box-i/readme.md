# Find The Lexicographically Largest String From The Box I

- **LeetCode**：[#3403 Find The Lexicographically Largest String From The Box I](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i/)
- **难度**：Medium
- **标签**：Two Pointers · String · Enumeration

## 题目

You are given a string word, and an integer numFriends.
Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:

word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
All the split words are put into a box.

Find the lexicographically largest string from the box after all the rounds are finished.

**Example 1**：

**Input**：word = "dbca", numFriends = 2
**Output**："dbc"
**Explanation**：
All possible splits are:

"d" and "bca".
"db" and "ca".
"dbc" and "a".


**Example 2**：

**Input**：word = "gggg", numFriends = 4
**Output**："g"
**Explanation**：
The only possible split is: "g", "g", "g", and "g".


**Constraints**：

1 $\le \mathrm{len}(word)$ $\le 5$ * 103
word consists only of lowercase English letters.
1 <= numFriends $\le \mathrm{len}(word)$
