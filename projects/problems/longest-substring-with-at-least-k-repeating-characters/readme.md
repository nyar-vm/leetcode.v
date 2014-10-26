# Longest Substring With At Least K Repeating Characters

- **LeetCode**：[#395 Longest Substring With At Least K Repeating Characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/)
- **难度**：Medium
- **标签**：Hash Table · String · Divide and Conquer · Sliding Window

## 题目

Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.
if no such substring exists, return 0.

**Example 1**：

**Input**：s = "aaabb", k = 3
**Output**：3
**Explanation**：The longest substring is "aaa", as 'a' is repeated 3 times.

**Example 2**：

**Input**：s = "ababbc", k = 2
**Output**：5
**Explanation**：The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 104$
s consists of only lowercase English letters.
1 <= k $\le 105$
