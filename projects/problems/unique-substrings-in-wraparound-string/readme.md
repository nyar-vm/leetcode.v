# Unique Substrings In Wraparound String

- **LeetCode**：[#467 Unique Substrings In Wraparound String](https://leetcode.com/problems/unique-substrings-in-wraparound-string/)
- **难度**：Medium
- **标签**：String · Dynamic Programming

## 题目

We define the string base to be the infinite wraparound string of "abcdefghijklmnopqrstuvwxyz", so base will look like this:

"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".

Given a string s, return the number of unique non-empty substrings of s are present in base.

**Example 1**：

**Input**：s = "a"
**Output**：1
**Explanation**：Only the substring "a" of s is in base.

**Example 2**：

**Input**：s = "cac"
**Output**：2
**Explanation**：There are two substrings ("a", "c") of s in base.

**Example 3**：

**Input**：s = "zab"
**Output**：6
**Explanation**：There are six substrings ("z", "a", "b", "za", "ab", and "zab") of s in base.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 105$
s consists of lowercase English letters.
