# Number Of Rectangles That Can Form The Largest Square

- **LeetCode**：[#1725 Number Of Rectangles That Can Form The Largest Square](https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square/)
- **难度**：Easy
- **标签**：Array

## 题目

You are given an array rectangles where rectangles[i] = [li, wi] represents the ith rectangle of length li and width wi.\r
\r
You can cut the ith rectangle to form a square with a side length of k if both k <= li and k <= wi. For example, if you have a rectangle [4,6], you can cut it to get a square with a side length of at most 4.\r
\r
Let maxLen be the side length of the largest square you can obtain from any of the given rectangles.\r
\r
Return the number of rectangles that can make a square with a side length of maxLen.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：rectangles = [[5,8],[3,9],[5,12],[16,5]]\r
**Output**：3\r
**Explanation**：The largest squares you can get from each rectangle are of lengths [5,3,5,5].\r
The largest possible square is of length 5, and you can get it out of 3 rectangles.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：rectangles = [[2,3],[3,7],[4,3],[3,7]]\r
**Output**：3\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(rectangles)$ $\le 1000$\r
rectangles[i].length == 2\r
1 <= li, wi $\le 109$\r
li != wi\r
