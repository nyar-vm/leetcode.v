# Unique Substrings With Equal Digit Frequency

- **LeetCode**：[#2168 Unique Substrings With Equal Digit Frequency](https://leetcode.com/problems/unique-substrings-with-equal-digit-frequency/)
- **难度**：Medium
- **标签**：Hash Table · String · Counting · Hash Function · Rolling Hash

## 题目

Given a digit string s, return the number of unique substrings of s where every digit appears the same number of times.

**Example 1**：

**Input**：s = "1212"
**Output**：5
**Explanation**：The substrings that meet the requirements are "1", "2", "12", "21", "1212".
Note that although the substring "12" appears twice, it is only counted once.

**Example 2**：

**Input**：s = "12321"
**Output**：9
**Explanation**：The substrings that meet the requirements are "1", "2", "3", "12", "23", "32", "21", "123", "321".


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
s consists of digits.
