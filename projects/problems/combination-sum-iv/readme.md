# Combination Sum Iv

- **LeetCode**：[#377 Combination Sum Iv](https://leetcode.com/problems/combination-sum-iv/)
- **难度**：Medium
- **标签**：Array · Dynamic Programming

## 题目

Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
The test cases are generated so that the answer can fit in a 32-bit integer.

**Example 1**：

**Input**：nums = [1,2,3], target = 4
**Output**：7
**Explanation**：
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.

**Example 2**：

**Input**：nums = [9], target = 3
**Output**：0


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 200$
1 <= nums[i] $\le 1000$
All the elements of nums are unique.
1 <= target $\le 1000$


Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?
