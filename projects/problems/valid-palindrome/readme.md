# Valid Palindrome

- **LeetCode**：[#125 Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- **难度**：Easy
- **标签**：Two Pointers · String

## 题目

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1**：

**Input**：s = "A man, a plan, a canal: Panama"
**Output**：true
**Explanation**："amanaplanacanalpanama" is a palindrome.

**Example 2**：

**Input**：s = "race a car"
**Output**：false
**Explanation**："raceacar" is not a palindrome.

**Example 3**：

**Input**：s = " "
**Output**：true
**Explanation**：s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 2$ * 105
s consists only of printable ASCII characters.
