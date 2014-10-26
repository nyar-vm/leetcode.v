# Check If An Array Is Consecutive

- **LeetCode**：[#2229 Check If An Array Is Consecutive](https://leetcode.com/problems/check-if-an-array-is-consecutive/)
- **难度**：Easy
- **标签**：Array · Hash Table · Sorting

## 题目

Given an integer array nums, return true if nums is consecutive, otherwise return false.
An array is consecutive if it contains every number in the range [x, x + n - 1] (inclusive), where x is the minimum number in the array and n is the length of the array.

**Example 1**：

**Input**：nums = [1,3,4,2]
**Output**：true
**Explanation**：
The minimum value is 1 and the length of nums is 4.
All of the values in the range [x, x + n - 1] = [1, 1 + 4 - 1] = [1, 4] = (1, 2, 3, 4) occur in nums.
Therefore, nums is consecutive.

**Example 2**：

**Input**：nums = [1,3]
**Output**：false
**Explanation**：
The minimum value is 1 and the length of nums is 2.
The value 2 in the range [x, x + n - 1] = [1, 1 + 2 - 1], = [1, 2] = (1, 2) does not occur in nums.
Therefore, nums is not consecutive.

**Example 3**：

**Input**：nums = [3,5,4]
**Output**：true
**Explanation**：
The minimum value is 3 and the length of nums is 3.
All of the values in the range [x, x + n - 1] = [3, 3 + 3 - 1] = [3, 5] = (3, 4, 5) occur in nums.
Therefore, nums is consecutive.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
0 <= nums[i] $\le 105$
