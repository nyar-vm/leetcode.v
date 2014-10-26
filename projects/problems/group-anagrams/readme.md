# Group Anagrams

- **LeetCode**：[#49 Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **难度**：Medium
- **标签**：Array · Hash Table · String · Sorting

## 题目

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

**Example 1**：

**Input**：strs = ["eat","tea","tan","ate","nat","bat"]
**Output**：[["bat"],["nat","tan"],["ate","eat","tea"]]
**Explanation**：

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.


**Example 2**：

**Input**：strs = [""]
**Output**：[[""]]

**Example 3**：

**Input**：strs = ["a"]
**Output**：[["a"]]


**Constraints**：

1 $\le \mathrm{len}(strs)$ $\le 104$
0 <= strs[i].length $\le 100$
strs[i] consists of lowercase English letters.
