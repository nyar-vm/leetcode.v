# Maximum Distance In Arrays

- **LeetCode**：[#624 Maximum Distance In Arrays](https://leetcode.com/problems/maximum-distance-in-arrays/)
- **难度**：Medium
- **标签**：Greedy · Array

## 题目

You are given m arrays, where each array is sorted in ascending order.
You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.
Return the maximum distance.

**Example 1**：

**Input**：arrays = [[1,2,3],[4,5],[1,2,3]]
**Output**：4
**Explanation**：One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.

**Example 2**：

**Input**：arrays = [[1],[1]]
**Output**：0


**Constraints**：

m == arrays.length
2 <= m $\le 105$
1 <= arrays[i].length $\le 500$
-104 <= arrays[i][j] $\le 104$
arrays[i] is sorted in ascending order.
There will be at most 105 integers in all the arrays.
