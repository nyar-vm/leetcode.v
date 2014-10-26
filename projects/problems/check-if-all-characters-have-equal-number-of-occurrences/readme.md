# Check If All Characters Have Equal Number Of Occurrences

- **LeetCode**：[#1941 Check If All Characters Have Equal Number Of Occurrences](https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/)
- **难度**：Easy
- **标签**：Hash Table · String · Counting

## 题目

Given a string s, return true if s is a good string, or false otherwise.
A string s is good if all the characters that appear in s have the same number of occurrences (i.e., the same frequency).

**Example 1**：

**Input**：s = "abacbc"
**Output**：true
**Explanation**：The characters that appear in s are 'a', 'b', and 'c'. All characters occur 2 times in s.

**Example 2**：

**Input**：s = "aaabb"
**Output**：false
**Explanation**：The characters that appear in s are 'a' and 'b'.
'a' occurs 3 times while 'b' occurs 2 times, which is not the same number of times.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
s consists of lowercase English letters.
