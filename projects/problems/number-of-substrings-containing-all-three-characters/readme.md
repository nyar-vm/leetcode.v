# Number Of Substrings Containing All Three Characters

- **LeetCode**：[#1358 Number Of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)
- **难度**：Medium
- **标签**：Hash Table · String · Sliding Window

## 题目

Given a string s consisting only of characters a, b and c.
Return the number of substrings containing at least one occurrence of all these characters a, b and c.

**Example 1**：

**Input**：s = "abcabc"
**Output**：10
**Explanation**：The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).

**Example 2**：

**Input**：s = "aaacb"
**Output**：3
**Explanation**：The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".

**Example 3**：

**Input**：s = "abc"
**Output**：1


**Constraints**：

3 $\le \mathrm{len}(s)$ $\le 5$ x $10^{4}$
s only consists of a, b or c characters.
