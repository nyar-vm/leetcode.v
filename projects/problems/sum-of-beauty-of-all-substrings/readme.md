# Sum Of Beauty Of All Substrings

- **LeetCode**：[#1781 Sum Of Beauty Of All Substrings](https://leetcode.com/problems/sum-of-beauty-of-all-substrings/)
- **难度**：Medium
- **标签**：Hash Table · String · Counting

## 题目

The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of "abaacc" is 3 - 1 = 2.

Given a string s, return the sum of beauty of all of its substrings.

**Example 1**：

**Input**：s = "aabcb"
**Output**：5
**Explanation**：The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
**Example 2**：

**Input**：s = "aabcbaa"
**Output**：17


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 500$
s consists of only lowercase English letters.
