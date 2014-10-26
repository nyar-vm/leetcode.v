# Maximum Frequency Of An Element After Performing Operations I

- **LeetCode**：[#3346 Maximum Frequency Of An Element After Performing Operations I](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/)
- **难度**：Medium
- **标签**：Array · Binary Search · Prefix Sum · Sorting · Sliding Window

## 题目

You are given an integer array nums and two integers k and numOperations.
You must perform an operation numOperations times on nums, where in each operation you:

Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].

Return the maximum possible frequency of any element in nums after performing the operations.

**Example 1**：

**Input**：nums = [1,4,5], k = 1, numOperations = 2
**Output**：2
**Explanation**：
We can achieve a maximum frequency of two by:

Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].


**Example 2**：

**Input**：nums = [5,11,20,20], k = 5, numOperations = 1
**Output**：2
**Explanation**：
We can achieve a maximum frequency of two by:

Adding 0 to nums[1].



**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
1 <= nums[i] $\le 105$
0 <= k $\le 105$
0 <= numOperations $\le \mathrm{len}(nums)$
