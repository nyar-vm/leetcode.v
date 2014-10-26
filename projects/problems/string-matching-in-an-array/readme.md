# String Matching In An Array

- **LeetCode**：[#1408 String Matching In An Array](https://leetcode.com/problems/string-matching-in-an-array/)
- **难度**：Easy
- **标签**：Array · String · String Matching

## 题目

Given an array of string words, return all strings in words that are a substring of another word. You can return the answer in any order.

**Example 1**：

**Input**：words = ["mass","as","hero","superhero"]
**Output**：["as","hero"]
**Explanation**："as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.

**Example 2**：

**Input**：words = ["leetcode","et","code"]
**Output**：["et","code"]
**Explanation**："et", "code" are substring of "leetcode".

**Example 3**：

**Input**：words = ["blue","green","bu"]
**Output**：[]
**Explanation**：No string of words is substring of another string.


**Constraints**：

1 $\le \mathrm{len}(words)$ $\le 100$
1 <= words[i].length $\le 30$
words[i] contains only lowercase English letters.
All the strings of words are unique.
