# Minimum Number Of Swaps To Make The Binary String Alternating

- **LeetCode**：[#1864 Minimum Number Of Swaps To Make The Binary String Alternating](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating/)
- **难度**：Medium
- **标签**：Greedy · String

## 题目

Given a binary string s, return the minimum number of character swaps to make it alternating, or -1 if it is impossible.
The string is called alternating if no two adjacent characters are equal. For example, the strings "010" and "1010" are alternating, while the string "0100" is not.
Any two characters may be swapped, even if they are not adjacent.

**Example 1**：

**Input**：s = "111000"
**Output**：1
**Explanation**：Swap positions 1 and 4: "111000" -> "101010"
The string is now alternating.

**Example 2**：

**Input**：s = "010"
**Output**：0
**Explanation**：The string is already alternating, no swaps are needed.

**Example 3**：

**Input**：s = "1110"
**Output**：-1


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
s[i] is either '0' or '1'.
