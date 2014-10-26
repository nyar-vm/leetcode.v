# Alphabet Board Path

- **LeetCode**：[#1138 Alphabet Board Path](https://leetcode.com/problems/alphabet-board-path/)
- **难度**：Medium
- **标签**：Hash Table · String

## 题目

On an alphabet board, we start at position (0, 0), corresponding to character board[0][0].\r
\r
Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"], as shown in the diagram below.\r
\r
\r
\r
We may make the following moves:\r
\r
\r
'U' moves our position up one row, if the position exists on the board;\r
'D' moves our position down one row, if the position exists on the board;\r
'L' moves our position left one column, if the position exists on the board;\r
'R' moves our position right one column, if the position exists on the board;\r
'!' adds the character board[r][c] at our current position (r, c) to the answer.\r
\r
\r
(Here, the only positions that exist on the board are positions with letters on them.)\r
\r
Return a sequence of moves that makes our answer equal to target in the minimum number of moves.  You may return any path that does so.\r
\r
\r
**Example 1**：\r
**Input**：target = "leet"\r
**Output**："DDR!UURRR!!DDD!"\r
**Example 2**：\r
**Input**：target = "code"\r
**Output**："RR!DDRR!UUL!R!"\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(target)$ $\le 100$\r
target consists only of English lowercase letters.\r
