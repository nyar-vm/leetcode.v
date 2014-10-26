# Count Subarrays Of Length Three With A Condition

- **LeetCode**：[#3392 Count Subarrays Of Length Three With A Condition](https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition/)
- **难度**：Easy
- **标签**：Array

## 题目

Given an integer array nums, return the number of subarrays of length 3 such that the sum of the first and third numbers equals exactly half of the second number.

**Example 1**：

**Input**：nums = [1,2,1,4,1]
**Output**：1
**Explanation**：
Only the subarray [1,4,1] contains exactly 3 elements where the sum of the first and third numbers equals half the middle number.

**Example 2**：

**Input**：nums = [1,1,1]
**Output**：0
**Explanation**：
[1,1,1] is the only subarray of length 3. However, its first and third numbers do not add to half the middle number.


**Constraints**：

3 $\le \mathrm{len}(nums)$ $\le 100$
-100 <= nums[i] $\le 100$
