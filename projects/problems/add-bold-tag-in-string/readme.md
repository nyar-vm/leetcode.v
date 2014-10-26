# Add Bold Tag In String

- **LeetCode**：[#616 Add Bold Tag In String](https://leetcode.com/problems/add-bold-tag-in-string/)
- **难度**：Medium
- **标签**：Trie · Array · Hash Table · String · String Matching

## 题目

You are given a string s and an array of strings words.
You should add a closed pair of bold tag  and  to wrap the substrings in s that exist in words.

If two such substrings overlap, you should wrap them together with only one pair of closed bold-tag.
If two substrings wrapped by bold tags are consecutive, you should combine them.

Return s after adding the bold tags.

**Example 1**：

**Input**：s = "abcxyz123", words = ["abc","123"]
**Output**："abcxyz123"
**Explanation**：The two strings of words are substrings of s as following: "abcxyz123".
We add  before each substring and  after each substring.

**Example 2**：

**Input**：s = "aaabbb", words = ["aa","b"]
**Output**："aaabbb"
**Explanation**：
"aa" appears as a substring two times: "aaabbb" and "aaabbb".
"b" appears as a substring three times: "aaabbb", "aaabbb", and "aaabbb".
We add  before each substring and  after each substring: "aaabbb".
Since the first two 's overlap, we merge them: "aaabbb".
Since now the four 's are consecutive, we merge them: "aaabbb".


**Constraints**：

1 $\le \mathrm{len}(s)$ $\le 1000$
0 $\le \mathrm{len}(words)$ $\le 100$
1 <= words[i].length $\le 1000$
s and words[i] consist of English letters and digits.
All the values of words are unique.


Note: This question is the same as 758. Bold Words in String.
