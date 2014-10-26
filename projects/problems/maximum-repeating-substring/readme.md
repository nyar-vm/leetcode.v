# Maximum Repeating Substring

- **LeetCode**：[#1668 Maximum Repeating Substring](https://leetcode.com/problems/maximum-repeating-substring/)
- **难度**：Easy
- **标签**：String · Dynamic Programming · String Matching

## 题目

For a string sequence, a string word is k-repeating if word concatenated k times is a substring of sequence. The word's maximum k-repeating value is the highest value k where word is k-repeating in sequence. If word is not a substring of sequence, word's maximum k-repeating value is 0.
Given strings sequence and word, return the maximum k-repeating value of word in sequence.

**Example 1**：

**Input**：sequence = "ababc", word = "ab"
**Output**：2
**Explanation**："abab" is a substring in "ababc".

**Example 2**：

**Input**：sequence = "ababc", word = "ba"
**Output**：1
**Explanation**："ba" is a substring in "ababc". "baba" is not a substring in "ababc".

**Example 3**：

**Input**：sequence = "ababc", word = "ac"
**Output**：0
**Explanation**："ac" is not a substring in "ababc".


**Constraints**：

1 $\le \mathrm{len}(sequence)$ $\le 100$
1 $\le \mathrm{len}(word)$ $\le 100$
sequence and word contains only lowercase English letters.
