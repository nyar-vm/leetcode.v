# [Remove Element](https://leetcode.com/problems/remove-element/)

## 问题

给定整数数组 `nums` 与整数 `val`，**原地**移除所有等于 `val` 的元素，并返回剩余元素个数 $k$。

要求：`nums` 的前 $k$ 个位置存放所有不等于 `val` 的元素（**顺序可以任意改变**）；$k$ 之后的内容不作要求。

**示例 1**

- **输入**：`nums = [3, 2, 2, 3]`，`val = 3`
- **输出**：`2`，前两位为 `[2, 2, _, _]`

**示例 2**

- **输入**：`nums = [0, 1, 2, 2, 3, 0, 4, 2]`，`val = 2`
- **输出**：`5`，前五位的五个非 $2$ 元素任意排列均可（如 `[0, 1, 4, 0, 3, _, _, _]`）

**约束**

- $0 \le \mathrm{len}(\texttt{nums}) \le 100$
- $0 \le \texttt{nums}[i], \texttt{val} \le 50$

## 解答

### 朴素想法

新建数组，收集所有不等于 `val` 的元素再写回。正确但需 $O(n)$ 额外空间，不符合原地要求。

### 逐段删除瓶颈

每发现一处 `val` 就整体左移后续元素，单次删除 $O(n)$，最坏 $O(n^2)$。

### 写指针 compaction 优化

维护写指针 $k$。从左到右扫描 $x$：若 $x \ne \texttt{val}$，则 $\texttt{nums}[k] \leftarrow x$，$k \leftarrow k+1$；等于 `val` 则跳过。一趟线性完成，且自然保留所有保留元素（顺序为扫描顺序，满足「可任意重排」）。

### 最终算法

$k \leftarrow 0$。对每个 $x \in \texttt{nums}$：若 $x \ne \texttt{val}$，写入 $\texttt{nums}[k]$ 并 $k++$。返回 $k$。空数组时 $k=0$；全为 `val` 时同样返回 $0$。

## 复杂度分析

### 时间复杂度

$O(n)$

$n = \mathrm{len}(\texttt{nums})$，每个元素处理常数次。

### 空间复杂度

$O(1)$

仅使用常数个指针，原地修改前缀。
