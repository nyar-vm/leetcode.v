# Occurrences After Bigram

- **LeetCode**：[#1078 Occurrences After Bigram](https://leetcode.com/problems/occurrences-after-bigram/)
- **难度**：Easy
- **标签**：String

## 题目

Given two strings first and second, consider occurrences in some text of the form "first second third", where second comes immediately after first, and third comes immediately after second.
Return an array of all the words third for each occurrence of "first second third".

**Example 1**：
**Input**：text = "alice is a good girl she is a good student", first = "a", second = "good"
**Output**：["girl","student"]
**Example 2**：
**Input**：text = "we will we will rock you", first = "we", second = "will"
**Output**：["we","rock"]


**Constraints**：

1 $\le \mathrm{len}(text)$ $\le 1000$
text consists of lowercase English letters and spaces.
All the words in text are separated by a single space.
1 $\le \mathrm{len}(first)$, second.length $\le 10$
first and second consist of lowercase English letters.
text will not have any leading or trailing spaces.
