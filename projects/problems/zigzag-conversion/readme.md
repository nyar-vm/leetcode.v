# [Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion/)

## 问题

将一个给定字符串 `s` 根据给定的行数 `numRows`，以从上到下、在 `numRows` 条行间按 Z 字形排列，再按行从左到右连接各行的字符，得到新的字符串。

**示例 1**

- **输入**：`s = "PAYPALISHIRING"`，`numRows = 3`
- **输出**：`"PAHNAPLSIIGYIR"`

**示例 2**

- **输入**：`s = "PAYPALISHIRING"`，`numRows = 4`
- **输出**：`"PINALSIGYAHRPI"`

**约束**

- $1 \le \mathrm{len}(s) \le 1000$
- $1 \le \texttt{numRows} \le 1000$
- `s` 由英文字母组成（`'A'–'Z'`，`'a'–'z'`，`,`, `.` 等题面字符）

## 解答

### 朴素想法

模拟 Z 字形：用 `numRows` 个桶按行收集字符，扫一遍 `s` 按行号投递，最后逐行拼接。正确，需维护多行缓冲。

### 多行缓冲的空间开销

显式保存每一行字符串，行数与 `numRows` 同阶，且最终还要再拼接一次。

### 按行直接定位下标

Z 字形在周期 $T = 2(\texttt{numRows}-1)$ 内，第 $r$ 行（$0 \le r < \texttt{numRows}$）上的字符出现在下标 $r,\, r+T,\, r+2T,\ldots$；若 $r$ 既不是首行也不是末行，同一周期内还有对称位置 $r + T - 2r$ 也属于该行。对每一行独立按上述下标序列收集，无需 `numRows` 个中间桶。

### 单行与退化情况

当 $\texttt{numRows}=1$ 时无折返，答案即为原串。

### 最终算法

若 $\texttt{numRows}=1$ 直接返回 `s`。否则令 $T=2(\texttt{numRows}-1)$，对 $r=0.. \texttt{numRows}-1$：从下标 $i=r$ 起步长 $T$ 取字符；若 $0<r<\texttt{numRows}-1$，同周期再取 $i + T - 2r$（若未越界）。按行序将字符依次写入结果。

## 复杂度分析

### 时间复杂度

$O(n)$

每个字符至多被访问常数次。

### 空间复杂度

$O(n)$

输出串长度即为 $n$；除结果外仅常数辅助变量。
