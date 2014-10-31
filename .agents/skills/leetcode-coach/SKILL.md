---
name: leetcode-coach
description: >-
  撰写 leetcode.v 单题 readme.md 教练稿：汉化题面，由浅入深推导最优算法，语言无关，
  具名瓶颈/优化小节，复杂度分小标题。用户提及题解、教练、readme、汉化、复杂度时加载。
---

# LeetCode Coach（readme.md）

算法教练稿：带读者从朴素想法推到应提交的最优算法。只讲算法与复杂度，与编程语言、求解器、`invoke` 无关。

## 标识符

| 术语           | 用途                                                                  |
|----------------|-----------------------------------------------------------------------|
| **slug**       | `projects/problems/<slug>/`；LeetCode URL 路径段                      |
| **id**         | `metadata.json` / catalog / `LEETCODE_BENCH_ID`（现与 slug 同字符串） |
| **questionId** | LeetCode 数字题号；仅留在 `metadata.json`                             |

## 输入（只读当前题目录）

1. `metadata.json` — 题意、`tests`（题号/难度/标签/`invoke` 不写进 readme）
2. LeetCode 公开题意（中文）
3. `solvers/python/solution.py` — 仅核对算法，readme 不得引用

禁止全仓 `**/*` glob。

## 文档结构

`# [题名](https://leetcode.com/problems/<slug>/)` → `## 问题` → `## 解答` → `## 复杂度分析`（含 `### 时间复杂度`、
`### 空间复杂度`，$O (...)$ 与理由分段）。

模板见 [references/coach-template.md](references/coach-template.md)。

## 解答（由浅入深）

`## 解答` 用 `###` 小标题 + 段落， **不用**有序列表：

| 小标题           | 内容                       |
|------------------|----------------------------|
| `### 朴素想法`   | 暴力做法与复杂度           |
| `### <简述>瓶颈` | 具体卡点（勿只写「瓶颈」） |
| `### <简述>优化` | 具体手段（勿只写「优化」） |
| `### 最终算法`   | 最优流程与边界             |

困难题可多组具名瓶颈/优化。不要独立「进阶」段；只写一条最终路径。

禁止：代码块、编程语言名、`invoke`、`solvers/`、`### 实现要点`。

## 检查清单

- [ ] 三节齐全；瓶颈/优化具名
- [ ] 语言无关；复杂度 LaTeX + 分段理由
- [ ] 标杆：`projects/problems/two-sum/readme.md`
