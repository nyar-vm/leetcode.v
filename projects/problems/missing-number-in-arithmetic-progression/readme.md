# Missing Number In Arithmetic Progression

- **LeetCode**：[#1228 Missing Number In Arithmetic Progression](https://leetcode.com/problems/missing-number-in-arithmetic-progression/)
- **难度**：Easy
- **标签**：Array · Math

## 题目

In some array arr, the values were in arithmetic progression: the values arr[i + 1] - arr[i] are all equal for every 0 <= i < arr.length - 1.
A value from arr was removed that was not the first or last value in the array.
Given arr, return the removed value.

**Example 1**：

**Input**：arr = [5,7,11,13]
**Output**：9
**Explanation**：The previous array was [5,7,9,11,13].

**Example 2**：

**Input**：arr = [15,13,12]
**Output**：14
**Explanation**：The previous array was [15,14,13,12].

**Constraints**：

3 $\le \mathrm{len}(arr)$ $\le 1000$
0 <= arr[i] $\le 105$
The given array is guaranteed to be a valid array.
