# Number Of Paths With Max Score

- **LeetCode**：[#1301 Number Of Paths With Max Score](https://leetcode.com/problems/number-of-paths-with-max-score/)
- **难度**：Hard
- **标签**：Array · Dynamic Programming · Matrix

## 题目

You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.\r
\r
You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.\r
\r
Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo $10^{9}$ + 7.\r
\r
In case there is no path, return [0, 0].\r
\r
\r
**Example 1**：\r
**Input**：board = ["E23","2X2","12S"]\r
**Output**：[7,1]\r
**Example 2**：\r
**Input**：board = ["E12","1X1","21S"]\r
**Output**：[4,2]\r
**Example 3**：\r
**Input**：board = ["E11","XXX","11S"]\r
**Output**：[0,0]\r
\r
\r
**Constraints**：\r
\r
\r
2 $\le \mathrm{len}(board)$ == board[i].length $\le 100$\r
