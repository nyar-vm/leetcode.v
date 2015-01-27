# [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

## 问题

给定长度为 $n$ 的整数数组 `height`。第 $i$ 条竖线端点为 $(i, 0)$ 与 $(i, \texttt{height}[i])$。任选两条竖线与 $x$ 轴围成容器，求能盛水的**最大面积**（不能倾斜容器）。

**示例 1**

- **输入**：`height = [1,8,6,2,5,4,8,3,7]`
- **输出**：`49`

**示例 2**

- **输入**：`height = [1,1]`
- **输出**：`1`

**约束**

- $n = \mathrm{len}(\texttt{height}) \ge 2$
- $0 \le \texttt{height}[i] \le 10^4$

## 解答

### 朴素想法

枚举所有下标对 $(l,r)$，面积 $\min(\texttt{height}[l],\texttt{height}[r]) \times (r-l)$，取最大。$O(n^2)$。

### 暴力配对的冗余计算

大量 $(l,r)$ 组合中，短板高度与宽度模式重复，双指针单调性未被利用。

### 双指针收缩

左右指针 $l=0$、$r=n-1$。当前面积由短板决定；若 $\texttt{height}[l] < \texttt{height}[r]$，则任何以 $l$ 为左边界、右边界 $\le r$ 的容器高度都不超过 $\texttt{height}[l]$，故可安全 $l \leftarrow l+1$；否则收缩 $r$。每步淘汰一类不可能更优的边界，直至相遇。

### 最终算法

维护答案 `ans`。循环中计算当前面积并更新 `ans`，再比较两端高度移动较短一侧指针。正确性源于：移动短板一侧不会错过更优解，因为宽度减小而高度上限不变或更低。

## 复杂度分析

### 时间复杂度

$O(n)$

指针最多移动 $n$ 步。

### 空间复杂度

$O(1)$

仅常数额外变量。
