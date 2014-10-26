# Find The Lexicographically Smallest Valid Sequence

- **LeetCode**：[#3302 Find The Lexicographically Smallest Valid Sequence](https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence/)
- **难度**：Medium
- **标签**：Greedy · Two Pointers · String · Dynamic Programming

## 题目

You are given two strings word1 and word2.
A string x is called almost equal to y if you can change at most one character in x to make it identical to y.
A sequence of indices seq is called valid if:

The indices are sorted in ascending order.
Concatenating the characters at these indices in word1 in the same order results in a string that is almost equal to word2.

Return an array of size word2.length representing the lexicographically smallest valid sequence of indices. If no such sequence of indices exists, return an empty array.
Note that the answer must represent the lexicographically smallest array, not the corresponding string formed by those indices.

**Example 1**：

**Input**：word1 = "vbcca", word2 = "abc"
**Output**：[0,1,2]
**Explanation**：
The lexicographically smallest valid sequence of indices is [0, 1, 2]:

Change word1[0] to 'a'.
word1[1] is already 'b'.
word1[2] is already 'c'.


**Example 2**：

**Input**：word1 = "bacdc", word2 = "abc"
**Output**：[1,2,4]
**Explanation**：
The lexicographically smallest valid sequence of indices is [1, 2, 4]:

word1[1] is already 'a'.
Change word1[2] to 'b'.
word1[4] is already 'c'.


**Example 3**：

**Input**：word1 = "aaaaaa", word2 = "aaabc"
**Output**：[]
**Explanation**：
There is no valid sequence of indices.

**Example 4**：

**Input**：word1 = "abc", word2 = "ab"
**Output**：[0,1]


**Constraints**：

1 $\le \mathrm{len}(word2)$ < word1.length $\le 3$ * 105
word1 and word2 consist only of lowercase English letters.
