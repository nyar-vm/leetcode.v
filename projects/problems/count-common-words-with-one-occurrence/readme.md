# Count Common Words With One Occurrence

- **LeetCode**：[#2085 Count Common Words With One Occurrence](https://leetcode.com/problems/count-common-words-with-one-occurrence/)
- **难度**：Easy
- **标签**：Array · Hash Table · String · Counting

## 题目

Given two string arrays words1 and words2, return the number of strings that appear exactly once in each of the two arrays.

**Example 1**：

**Input**：words1 = ["leetcode","is","amazing","as","is"], words2 = ["amazing","leetcode","is"]
**Output**：2
**Explanation**：
- "leetcode" appears exactly once in each of the two arrays. We count this string.
- "amazing" appears exactly once in each of the two arrays. We count this string.
- "is" appears in each of the two arrays, but there are 2 occurrences of it in words1. We do not count this string.
- "as" appears once in words1, but does not appear in words2. We do not count this string.
Thus, there are 2 strings that appear exactly once in each of the two arrays.

**Example 2**：

**Input**：words1 = ["b","bb","bbb"], words2 = ["a","aa","aaa"]
**Output**：0
**Explanation**：There are no strings that appear in each of the two arrays.

**Example 3**：

**Input**：words1 = ["a","ab"], words2 = ["a","a","a","ab"]
**Output**：1
**Explanation**：The only string that appears exactly once in each of the two arrays is "ab".


**Constraints**：

1 $\le \mathrm{len}(words1)$, words2.length $\le 1000$
1 <= words1[i].length, words2[j].length $\le 30$
words1[i] and words2[j] consists only of lowercase English letters.
