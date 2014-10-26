# Print Words Vertically

- **LeetCode**：[#1324 Print Words Vertically](https://leetcode.com/problems/print-words-vertically/)
- **难度**：Medium
- **标签**：Array · String · Simulation

## 题目

Given a string s. Return all the words vertically in the same order in which they appear in s.\r
Words are returned as a list of strings, complete with spaces when is necessary. (Trailing spaces are not allowed).\r
Each word would be put on only one column and that in one column there will be only one word.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：s = "HOW ARE YOU"\r
**Output**：["HAY","ORO","WEU"]\r
**Explanation**：Each word is printed vertically. \r
"HAY"\r
"ORO"\r
"WEU"\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：s = "TO BE OR NOT TO BE"\r
**Output**：["TBONTB","OEROOE","   T"]\r
**Explanation**：Trailing spaces is not allowed. \r
"TBONTB"\r
"OEROOE"\r
"   T"\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：s = "CONTEST IS COMING"\r
**Output**：["CIC","OSO","N M","T I","E N","S G","T"]\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(s)$ $\le 200$\r
s contains only upper case English letters.\r
It's guaranteed that there is only one space between 2 words.\r
