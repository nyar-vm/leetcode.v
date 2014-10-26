# Count The Number Of Special Characters Ii

- **LeetCode**：[#3121 Count The Number Of Special Characters Ii](https://leetcode.com/problems/count-the-number-of-special-characters-ii/)
- **难度**：Medium
- **标签**：Hash Table · String

## 题目

You are given a string word. A letter c is called special if it appears both in lowercase and uppercase in word, and every lowercase occurrence of c appears before the first uppercase occurrence of c.
Return the number of special letters in word.

**Example 1**：

**Input**：word = "aaAbcBC"
**Output**：3
**Explanation**：
The special characters are 'a', 'b', and 'c'.

**Example 2**：

**Input**：word = "abc"
**Output**：0
**Explanation**：
There are no special characters in word.

**Example 3**：

**Input**：word = "AbBCab"
**Output**：0
**Explanation**：
There are no special characters in word.


**Constraints**：

1 $\le \mathrm{len}(word)$ $\le 2$ * 105
word consists of only lowercase and uppercase English letters.
