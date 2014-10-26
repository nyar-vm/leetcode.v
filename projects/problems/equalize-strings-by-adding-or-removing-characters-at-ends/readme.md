# Equalize Strings By Adding Or Removing Characters At Ends

- **LeetCode**：[#3135 Equalize Strings By Adding Or Removing Characters At Ends](https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends/)
- **难度**：Medium
- **标签**：String · Binary Search · Dynamic Programming · Sliding Window · Hash Function

## 题目

Given two strings initial and target, your task is to modify initial by performing a series of operations to make it equal to target.
In one operation, you can add or remove one character only at the beginning or the end of the string initial.
Return the minimum number of operations required to transform initial into target.

**Example 1**：

**Input**：initial = "abcde", target = "cdef"
**Output**：3
**Explanation**：
Remove 'a' and 'b' from the beginning of initial, then add 'f' to the end.

**Example 2**：

**Input**：initial = "axxy", target = "yabx"
**Output**：6
**Explanation**：



Operation
Resulting String


Add 'y' to the beginning
"yaxxy"


Remove from end
"yaxx"


Remove from end
"yax"


Remove from end
"ya"


Add 'b' to the end
"yab"


Add 'x' to the end
"yabx"




**Example 3**：

**Input**：initial = "xyz", target = "xyz"
**Output**：0
**Explanation**：
No operations are needed as the strings are already equal.


**Constraints**：

1 $\le \mathrm{len}(initial)$, target.length $\le 1000$
initial and target consist only of lowercase English letters.
