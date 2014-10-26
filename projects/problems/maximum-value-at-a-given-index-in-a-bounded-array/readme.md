# Maximum Value At A Given Index In A Bounded Array

- **LeetCode**：[#1802 Maximum Value At A Given Index In A Bounded Array](https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/)
- **难度**：Medium
- **标签**：Greedy · Binary Search

## 题目

You are given three positive integers: n, index, and maxSum. You want to construct an array nums (0-indexed) that satisfies the following conditions:

nums.length == n
nums[i] is a positive integer where 0 <= i < n.
abs(nums[i] - nums[i+1]) $\le 1$ where 0 <= i < n-1.
The sum of all the elements of nums does not exceed maxSum.
nums[index] is maximized.

Return nums[index] of the constructed array.
Note that abs(x) equals x if x $\ge 0$, and -x otherwise.

**Example 1**：

**Input**：n = 4, index = 2,  maxSum = 6
**Output**：2
**Explanation**：nums = [1,2,2,1] is one array that satisfies all the conditions.
There are no arrays that satisfy all the conditions and have nums[2] == 3, so 2 is the maximum nums[2].

**Example 2**：

**Input**：n = 6, index = 1,  maxSum = 10
**Output**：3


**Constraints**：

1 <= n <= maxSum $\le 109$
0 <= index < n
