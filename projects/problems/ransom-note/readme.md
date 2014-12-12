# [Ransom Note](https://leetcode.com/problems/ransom-note/)

## 问题

给定字符串 `ransomNote` 与 `magazine`，判断能否用 `magazine` 中的字母（每个字母最多用一次）拼出 `ransomNote`。

**示例 1**

- **输入**：`ransomNote = "a"`，`magazine = "b"`
- **输出**：`false`

**示例 2**

- **输入**：`ransomNote = "aa"`，`magazine = "ab"`
- **输出**：`false`

**示例 3**

- **输入**：`ransomNote = "aa"`，`magazine = "aab"`
- **输出**：`true`

**约束**

- $1 \le \mathrm{len}(\texttt{ransomNote}), \mathrm{len}(\texttt{magazine}) \le 10^5$
- 两串均由小写英文字母组成

## 解答

### 朴素想法

对每个 `ransomNote` 字符在 `magazine` 中线性查找并标记已用，最坏 $O(mn)$，长串不可接受。

### 重复扫描杂志瓶颈

逐字匹配会导致同一字母被多次「从头找」，无法高效复用已统计的可用量。

### 频次表一次扣减优化

先统计 `magazine` 各字母出现次数，再扫描 `ransomNote`：每遇到一个字母就将对应计数减 1；若某计数变负，说明杂志供给不足，立即返回失败。全部扣完则成功。

### 最终算法

建立 26 个小写字母计数（或哈希表）。第一遍累加 `magazine`；第二遍遍历 `ransomNote` 递减并在 `<0` 时短路失败。只需 magazine 频次不少于 ransomNote 需求即可，顺序无关。

## 复杂度分析

### 时间复杂度

$O(m + n)$

其中 $m=\mathrm{len}(\texttt{magazine})$、$n=\mathrm{len}(\texttt{ransomNote})$，各扫描一遍。

### 空间复杂度

$O(1)$

字母表大小固定为 26，计数表规模为常数（若用哈希表，不同字母种类至多 26）。
