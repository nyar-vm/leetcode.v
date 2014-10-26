# Check If All 1s Are At Least Length K Places Away

- **LeetCode**：[#1437 Check If All 1s Are At Least Length K Places Away](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/)
- **难度**：Easy
- **标签**：Array

## 题目

Given an binary array nums and an integer k, return true if all 1's are at least k places away from each other, otherwise return false.

**Example 1**：


**Input**：nums = [1,0,0,0,1,0,0,1], k = 2
**Output**：true
**Explanation**：Each of the 1s are at least 2 places away from each other.

**Example 2**：


**Input**：nums = [1,0,0,1,0,1], k = 2
**Output**：false
**Explanation**：The second 1 and third 1 are only one apart from each other.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
0 <= k $\le \mathrm{len}(nums)$
nums[i] is 0 or 1
