# Maximum Product Of Word Lengths

- **LeetCode**：[#318 Maximum Product Of Word Lengths](https://leetcode.com/problems/maximum-product-of-word-lengths/)
- **难度**：Medium
- **标签**：Bit Manipulation · Array · String

## 题目

Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.

**Example 1**：

**Input**：words = ["abcw","baz","foo","bar","xtfn","abcdef"]
**Output**：16
**Explanation**：The two words can be "abcw", "xtfn".

**Example 2**：

**Input**：words = ["a","ab","abc","d","cd","bcd","abcd"]
**Output**：4
**Explanation**：The two words can be "ab", "cd".

**Example 3**：

**Input**：words = ["a","aa","aaa","aaaa"]
**Output**：0
**Explanation**：No such pair of words.


**Constraints**：

2 $\le \mathrm{len}(words)$ $\le 1000$
1 <= words[i].length $\le 1000$
words[i] consists only of lowercase English letters.
