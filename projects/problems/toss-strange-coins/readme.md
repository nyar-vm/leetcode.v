# Toss Strange Coins

- **LeetCode**：[#1230 Toss Strange Coins](https://leetcode.com/problems/toss-strange-coins/)
- **难度**：Medium
- **标签**：Array · Math · Dynamic Programming · Probability and Statistics

## 题目

You have some coins.  The i-th coin has a probability prob[i] of facing heads when tossed.
Return the probability that the number of coins facing heads equals target if you toss every coin exactly once.

**Example 1**：
**Input**：prob = [0.4], target = 1
**Output**：0.40000
**Example 2**：
**Input**：prob = [0.5,0.5,0.5,0.5,0.5], target = 0
**Output**：0.03125


**Constraints**：

1 $\le \mathrm{len}(prob)$ $\le 1000$
0 <= prob[i] $\le 1$
0 <= target $\le \mathrm{len}(prob)$
Answers will be accepted as correct if they are within 10^-5 of the correct answer.
