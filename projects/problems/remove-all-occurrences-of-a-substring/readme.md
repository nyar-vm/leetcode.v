# Remove All Occurrences Of A Substring

- **LeetCode**：[#1910 Remove All Occurrences Of A Substring](https://leetcode.com/problems/remove-all-occurrences-of-a-substring/)
- **难度**：Medium
- **标签**：Stack · String · Simulation

## 题目

Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:

Find the leftmost occurrence of the substring part and remove it from s.

Return s after removing all occurrences of part.
A substring is a contiguous sequence of characters in a string.

**Example 1**：

**Input**：s = "daabcbaabcbc", part = "abc"
**Output**："dab"
**Explanation**：The following operations are done:
- s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
- s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
- s = "dababc", remove "abc" starting at index 3, so s = "dab".
Now s has no occurrences of "abc".

**Example 2**：

**Input**：s = "axxxxyyyyb", part = "xy"
**Output**："ab"
**Explanation**：The following operations are done:
- s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
- s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
- s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
- s = "axyb", remove "xy" starting at index 1 so s = "ab".
Now s has no occurrences of "xy".


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
1 $\le \mathrm{len}(part)$ $\le 1000$
s​​​​​​ and part consists of lowercase English letters.
