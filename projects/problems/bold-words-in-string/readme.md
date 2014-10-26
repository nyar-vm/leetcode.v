# Bold Words In String

- **LeetCode**：[#758 Bold Words In String](https://leetcode.com/problems/bold-words-in-string/)
- **难度**：Medium
- **标签**：Trie · Array · Hash Table · String · String Matching

## 题目

Given an array of keywords words and a string s, make all appearances of all keywords words[i] in s bold. Any letters between  and  tags become bold.
Return s after adding the bold tags. The returned string should use the least number of tags possible, and the tags should form a valid combination.

**Example 1**：

**Input**：words = ["ab","bc"], s = "aabcd"
**Output**："aabcd"
**Explanation**：Note that returning "aabcd" would use more tags, so it is incorrect.

**Example 2**：

**Input**：words = ["ab","cb"], s = "aabcd"
**Output**："aabcd"


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 500$
0 $\le \mathrm{len}(words)$ $\le 50$
1 <= words[i].length $\le 10$
s and words[i] consist of lowercase English letters.


Note: This question is the same as 616. Add Bold Tag in String.
