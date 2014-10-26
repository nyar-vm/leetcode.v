# Find The Xor Of Numbers Which Appear Twice

- **LeetCode**：[#3158 Find The Xor Of Numbers Which Appear Twice](https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice/)
- **难度**：Easy
- **标签**：Bit Manipulation · Array · Hash Table

## 题目

You are given an array nums, where each number in the array appears either once or twice.
Return the bitwise XOR of all the numbers that appear twice in the array, or 0 if no number appears twice.

**Example 1**：

**Input**：nums = [1,2,1,3]
**Output**：1
**Explanation**：
The only number that appears twice in nums is 1.

**Example 2**：

**Input**：nums = [1,2,3]
**Output**：0
**Explanation**：
No number appears twice in nums.

**Example 3**：

**Input**：nums = [1,2,2,1]
**Output**：3
**Explanation**：
Numbers 1 and 2 appeared twice. 1 XOR 2 == 3.


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 50$
1 <= nums[i] $\le 50$
Each number in nums appears either once or twice.
