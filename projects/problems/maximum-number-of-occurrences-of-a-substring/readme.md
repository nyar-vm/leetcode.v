# Maximum Number Of Occurrences Of A Substring

- **LeetCode**：[#1297 Maximum Number Of Occurrences Of A Substring](https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/)
- **难度**：Medium
- **标签**：Hash Table · String · Sliding Window

## 题目

Given a string s, return the maximum number of occurrences of any substring under the following rules:

The number of unique characters in the substring must be less than or equal to maxLetters.
The substring size must be between minSize and maxSize inclusive.


**Example 1**：

**Input**：s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
**Output**：2
**Explanation**：Substring "aab" has 2 occurrences in the original string.
It satisfies the conditions, 2 unique letters and size 3 (between minSize and maxSize).

**Example 2**：

**Input**：s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
**Output**：2
**Explanation**：Substring "aaa" occur 2 times in the string. It can overlap.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 105$
1 <= maxLetters $\le 26$
1 <= minSize <= maxSize <= min(26, s.length)
s consists of only lowercase English letters.
