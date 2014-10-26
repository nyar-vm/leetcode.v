# Stone Game Viii

- **LeetCode**：[#1872 Stone Game Viii](https://leetcode.com/problems/stone-game-viii/)
- **难度**：Hard
- **标签**：Array · Math · Dynamic Programming · Game Theory · Prefix Sum

## 题目

Alice and Bob take turns playing a game, with Alice starting first.\r
\r
There are n stones arranged in a row. On each player's turn, while the number of stones is more than one, they will do the following:\r
\r
\r
Choose an integer x > 1, and remove the leftmost x stones from the row.\r
Add the sum of the removed stones' values to the player's score.\r
Place a new stone, whose value is equal to that sum, on the left side of the row.\r
\r
\r
The game stops when only one stone is left in the row.\r
\r
The score difference between Alice and Bob is (Alice's score - Bob's score). Alice's goal is to maximize the score difference, and Bob's goal is the minimize the score difference.\r
\r
Given an integer array stones of length n where stones[i] represents the value of the ith stone from the left, return the score difference between Alice and Bob if they both play optimally.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：stones = [-1,2,-3,4,-5]\r
**Output**：5\r
**Explanation**：\r
- Alice removes the first 4 stones, adds (-1) + 2 + (-3) + 4 = 2 to her score, and places a stone of\r
value 2 on the left. stones = [2,-5].\r
- Bob removes the first 2 stones, adds 2 + (-5) = -3 to his score, and places a stone of value -3 on\r
the left. stones = [-3].\r
The difference between their scores is 2 - (-3) = 5.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：stones = [7,-6,5,10,5,-2,-6]\r
**Output**：13\r
**Explanation**：\r
- Alice removes all stones, adds 7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13 to her score, and places a\r
stone of value 13 on the left. stones = [13].\r
The difference between their scores is 13 - 0 = 13.\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：stones = [-10,-12]\r
**Output**：-22\r
**Explanation**：\r
- Alice can only make one move, which is to remove both stones. She adds (-10) + (-12) = -22 to her\r
score and places a stone of value -22 on the left. stones = [-22].\r
The difference between their scores is (-22) - 0 = -22.\r
\r
\r
\r
**Constraints**：\r
\r
\r
n == stones.length\r
2 <= n $\le 105$\r
-104 <= stones[i] $\le 104$\r
