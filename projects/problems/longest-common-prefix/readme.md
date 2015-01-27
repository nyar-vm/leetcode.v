# [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

## 问题

给定字符串数组 `strs`，求所有字符串的**最长公共前缀**。若无公共前缀，返回空串 `""`。

**示例 1**

- **输入**：`strs = ["flower","flow","flight"]`
- **输出**：`"fl"`

**示例 2**

- **输入**：`strs = ["dog","racecar","car"]`
- **输出**：`""`

**约束**

- $1 \le \mathrm{len}(\texttt{strs}) \le 200$
- $0 \le \mathrm{len}(\texttt{strs}[i]) \le 200$
- 非空串仅含小写英文字母

## 解答

### 朴素想法

枚举所有可能的前缀长度 $L$，检查每个字符串前 $L$ 个字符是否一致。$L$ 上界为最短串长，每档需 $O(m \cdot n)$ 比较（$m$ 为串数，$n$ 为长度上界）。

### 前缀长度枚举的重复扫描

对每一档 $L$ 重新比较全部字符串，同一字符位被多次读取，且与「按列同步推进」的视角脱节。

### 纵向逐列扫描

以 `strs[0]` 为参照，对列下标 $i=0,1,\ldots$ 检查其余串在位置 $i$ 是否存在且字符与 `strs[0][i]` 相同。首次失配或某串已结束则公共前缀长度为 $i$，返回 `strs[0]` 的前 $i$ 个字符。若 `strs[0]` 全部列均通过，则整串 `strs[0]` 即为答案。

### 最终算法

若数组为空返回 `""`（题设通常非空，可防御）。令 `first = strs[0]`。外层 $i$ 从 $0$ 到 $\mathrm{len}(\texttt{first})-1$，内层遍历 $j=1,\ldots,m-1$：若 $\mathrm{len}(\texttt{strs}[j]) \le i$ 或 $\texttt{strs}[j][i] \ne \texttt{first}[i]$，返回 `first` 的前 $i$ 个字符。循环结束返回 `first`。

## 复杂度分析

### 时间复杂度

$O(S)$

$S$ 为所有字符总数之和；每字符最多比较一次。

### 空间复杂度

$O(1)$

除输出外仅常数变量；输出长度不超过最短串长。
