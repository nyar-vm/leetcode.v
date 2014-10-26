# Top K Frequent Elements

- **LeetCode**：[#347 Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **难度**：Medium
- **标签**：Array · Hash Table · Divide and Conquer · Bucket Sort · Counting · Quickselect · Sorting · Heap (Priority Queue)

## 题目

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Example 1**：
**Input**：nums = [1,1,1,2,2,3], k = 2
**Output**：[1,2]
**Example 2**：
**Input**：nums = [1], k = 1
**Output**：[1]


**Constraints**：

1 $\le \mathrm{len}(nums)$ $\le 105$
-104 <= nums[i] $\le 104$
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.


Follow up: Your algorithm's time complexity must be better than $O(n \log n)$, where n is the array's size.
