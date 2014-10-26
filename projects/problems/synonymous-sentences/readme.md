# Synonymous Sentences

- **LeetCode**：[#1258 Synonymous Sentences](https://leetcode.com/problems/synonymous-sentences/)
- **难度**：Medium
- **标签**：Union Find · Array · Hash Table · String · Backtracking

## 题目

You are given a list of equivalent string pairs synonyms where synonyms[i] = [si, ti] indicates that si and ti are equivalent strings. You are also given a sentence text.
Return all possible synonymous sentences sorted lexicographically.

**Example 1**：

**Input**：synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]], text = "I am happy today but was sad yesterday"
**Output**：["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]

**Example 2**：

**Input**：synonyms = [["happy","joy"],["cheerful","glad"]], text = "I am happy today but was sad yesterday"
**Output**：["I am happy today but was sad yesterday","I am joy today but was sad yesterday"]


**Constraints**：

0 $\le \mathrm{len}(synonyms)$ $\le 10$
synonyms[i].length == 2
1 $\le \mathrm{len}(si)$, ti.length $\le 10$
si != ti
text consists of at most 10 words.
All the pairs of synonyms are unique.
The words of text are separated by single spaces.
