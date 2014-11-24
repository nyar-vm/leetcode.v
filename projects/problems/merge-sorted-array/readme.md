# [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

## 问题

给定两个按非递减顺序排序的整数数组 `nums1`、`nums2`，以及整数 `m`、`n`，分别表示 `nums1` 与 `nums2` 中**有效元素**的个数。

将 `nums2` 合并进 `nums1`，使 `nums1` 成为一个按非递减顺序排序的数组。**原地**完成，结果存放在 `nums1` 中。

`nums1` 长度为 $m+n$，前 $m$ 个为待合并元素，后 $n$ 个为占位（可忽略）；`nums2` 长度为 $n$。

**示例 1**

- **输入**：`nums1 = [1, 2, 3, 0, 0, 0]`，`m = 3`，`nums2 = [2, 5, 6]`，`n = 3`
- **输出**：`nums1 = [1, 2, 2, 3, 5, 6]`

**示例 2**

- **输入**：`nums1 = [1]`，`m = 1`，`nums2 = []`，`n = 0`
- **输出**：`[1]`

**示例 3**

- **输入**：`nums1 = [0]`，`m = 0`，`nums2 = [1]`，`n = 1`
- **输出**：`[1]`（`m = 0` 时 `nums1` 无有效元素，仅占位）

**约束**

- $\mathrm{len}(\texttt{nums1}) = m + n$，$\mathrm{len}(\texttt{nums2}) = n$
- $0 \le m, n \le 200$，$1 \le m+n \le 200$
- $-10^9 \le \texttt{nums1}[i], \texttt{nums2}[j] \le 10^9$

## 解答

### 朴素想法

复制 `nums1` 前 $m$ 个与整个 `nums2`，排序后写回。需额外 $O(m+n)$ 空间，且排序 $O((m+n)\log(m+n))$，未利用已有序性质。

### 自前向后合并瓶颈

从 `nums1` 头部开始比较写入，较大者后移会覆盖尚未处理的 `nums1` 元素，需要额外缓冲区或整体后移，代价高。

### 自后向前双指针优化

`nums1` 尾部 $n$ 个位置空闲。设写指针 $k = m+n-1$，`nums1` 有效尾 $i = m-1$，`nums2` 尾 $j = n-1$。当 $j \ge 0$：若 $i \ge 0$ 且 $\texttt{nums1}[i] > \texttt{nums2}[j]$，则 $\texttt{nums1}[k] \leftarrow \texttt{nums1}[i]$，$i--$；否则 $\texttt{nums1}[k] \leftarrow \texttt{nums2}[j]$，$j--$；然后 $k--$。从最大元素填起，永不覆盖未合并的 `nums1` 前缀。

### 最终算法

初始化 $k,i,j$ 如上。`while j >= 0` 执行比较写入并移动指针。当 $n=0$ 时循环不进入；$m=0$ 时仅剩将 `nums2` 写入 `nums1`。

## 复杂度分析

### 时间复杂度

$O(m + n)$

每个元素至多被写入一次。

### 空间复杂度

$O(1)$

仅使用常数个指针，原地修改 `nums1`。
