# Counting Words With A Given Prefix

- **LeetCode**：[#2185 Counting Words With A Given Prefix](https://leetcode.com/problems/counting-words-with-a-given-prefix/)
- **难度**：Easy
- **标签**：Array · String · String Matching

## 题目

You are given an array of strings words and a string pref.
Return the number of strings in words that contain pref as a prefix.
A prefix of a string s is any leading contiguous substring of s.

**Example 1**：

**Input**：words = ["pay","attention","practice","attend"], pref = "at"
**Output**：2
**Explanation**：The 2 strings that contain "at" as a prefix are: "attention" and "attend".

**Example 2**：

**Input**：words = ["leetcode","win","loops","success"], pref = "code"
**Output**：0
**Explanation**：There are no strings that contain "code" as a prefix.


**Constraints**：

1 $\le \mathrm{len}(words)$ $\le 100$
1 <= words[i].length, pref.length $\le 100$
words[i] and pref consist of lowercase English letters.
