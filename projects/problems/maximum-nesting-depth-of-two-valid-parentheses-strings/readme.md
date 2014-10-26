# Maximum Nesting Depth Of Two Valid Parentheses Strings

- **LeetCode**：[#1111 Maximum Nesting Depth Of Two Valid Parentheses Strings](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)
- **难度**：Medium
- **标签**：Stack · String

## 题目

A string is a valid parentheses string (denoted VPS) if and only if it consists of "(" and ")" characters only, and:\r
\r
\r
It is the empty string, or\r
It can be written as AB (A concatenated with B), where A and B are VPS's, or\r
It can be written as (A), where A is a VPS.\r
\r
\r
We can similarly define the nesting depth depth(S) of any VPS S as follows:\r
\r
\r
depth("") = 0\r
depth(A + B) = max(depth(A), depth(B)), where A and B are VPS's\r
depth("(" + A + ")") = 1 + depth(A), where A is a VPS.\r
\r
\r
For example,  "", "()()", and "()(()())" are VPS's (with nesting depths 0, 1, and 2), and ")(" and "(()" are not VPS's.\r
\r
\r
\r
Given a VPS seq, split it into two disjoint subsequences A and B, such that A and B are VPS's (and A.length + B.length = seq.length).\r
\r
Now choose any such A and B such that max(depth(A), depth(B)) is the minimum possible value.\r
\r
Return an answer array (of length seq.length) that encodes such a choice of A and B:  answer[i] = 0 if seq[i] is part of A, else answer[i] = 1.  Note that even though multiple answers may exist, you may return any of them.\r


**Example 1**：

**Input**：seq = "(()())"
**Output**：[0,1,1,1,1,0]

**Example 2**：

**Input**：seq = "()(())()"
**Output**：[0,0,0,1,1,0,1,1]


**Constraints**：

1 <= seq.size $\le 10000$
