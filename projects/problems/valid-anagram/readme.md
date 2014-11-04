# [Valid Anagram](https://leetcode.com/problems/valid-anagram/)

## 问题

给定两个字符串 `s` 和 `t`，若 `t` 是 `s` 的字母异位词（两个串包含相同字符、相同频次，顺序可不同），返回 `true`；否则返回 `false`。

**示例 1**

- **输入**：`s = "anagram"`，`t = "nagaram"`
- **输出**：`true`

**示例 2**

- **输入**：`s = "rat"`，`t = "car"`
- **输出**：`false`

**约束**

- $1 \le \mathrm{len}(\texttt{s})$、$\mathrm{len}(\texttt{t}) \le 5 \times 10^4$
- `s` 与 `t` 仅含小写英文字母

## 解答

### 朴素想法

将两串分别排序后逐位比较。正确性直观，复杂度 $O(n \log n)$（$n$ 为串长）。

### 全串排序过重瓶颈

只需比较**字符频次**，排序引入了不必要的全局顺序信息。

### 频次表线性比对优化

若 $\mathrm{len}(\texttt{s}) \neq \mathrm{len}(\texttt{t})$ 直接 `false`。否则用长度为 $26$ 的频次表（或小写字母映射表）：扫 `s` 增计数、扫 `t` 减计数；任一计数非零则 `false`，否则 `true`。两遍扫描 $O(n)$。

### 最终算法

长度不等 → `false`。维护 $26$ 个字母计数；`s` 增、`t` 减；最后检查是否全为零。

## 复杂度分析

### 时间复杂度

$O(n)$

$n = \mathrm{len}(\texttt{s})$，常数次遍历字符串与固定大小字母表。

### 空间复杂度

$O(1)$

字母表大小固定为 $26$，与 $n$ 无关。
