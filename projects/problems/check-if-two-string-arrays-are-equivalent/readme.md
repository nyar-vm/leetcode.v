# Check If Two String Arrays Are Equivalent

- **LeetCode**：[#1662 Check If Two String Arrays Are Equivalent](https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/)
- **难度**：Easy
- **标签**：Array · String

## 题目

Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.
A string is represented by an array if the array elements concatenated in order forms the string.

**Example 1**：

**Input**：word1 = ["ab", "c"], word2 = ["a", "bc"]
**Output**：true
**Explanation**：
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.
**Example 2**：

**Input**：word1 = ["a", "cb"], word2 = ["ab", "c"]
**Output**：false

**Example 3**：

**Input**：word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
**Output**：true


**Constraints**：

1 $\le \mathrm{len}(word1)$, word2.length $\le 103$
1 <= word1[i].length, word2[i].length $\le 103$
1 <= sum(word1[i].length), sum(word2[i].length) $\le 103$
word1[i] and word2[i] consist of lowercase letters.
