# SXO 批量补题 Gap（catalog 前 N 题）

生成时间：2026-09-25T11:08:39.575Z

批量范围：catalog 前 **50** 题（与 `LEETCODE_BATCH_LIMIT` / batch-limit 默认一致）。

能力 backlog 主表：`.agents/skills/sxo-evolution/references/capability-backlog.md`

## 汇总

| 语言 | 测例全绿 | 失败 |
|------|----------|------|
| Wolfram (Sxo) | 1 | 49 |
| MATLAB (Sxo) | 1 | 49 |

## Gap 频次（失败题）

| Gap ID | 次数 | 说明 |
|--------|------|------|
| S-004 | 2 | 循环 / 控制流 evaluate 未稳定（总类） |
| S-006 | 1 | Wolfram `Do` / `Return` / 嵌套循环 |
| S-008 | 1 | MATLAB `function` + `for` + `return` |
| S-009 | 2 | Wolfram `:=` 用户函数求值为 `Null` |
| S-010 | 34 | 字符串 Part / 字符访问 |
| S-011 | 3 | MATLAB 用户函数体 `error node` |
| S-012 | 12 | 链表（数组模拟） |
| S-013 | 24 | 排序 / 双指针多指针 |
| S-014 | 6 | 二维矩阵 |
| S-015 | 8 | 回溯 / 递归 / DFS |
| S-016 | 3 | 哈希 / 关联结构 |
| S-017 | 2 | 正则 / 通配 / DP 表 |

## 逐题

| # | slug | Wolfram | MATLAB | Gap (W) | Gap (M) | 摘要 |
|---|------|---------|--------|---------|---------|------|
| 1 | `two-sum` | pass | pass | S-006 | S-008 |  |
| 2 | `add-two-numbers` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 3 | `longest-substring-without-repeating-characters` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 4 | `median-of-two-sorted-arrays` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 5 | `longest-palindromic-substring` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 6 | `zigzag-conversion` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 7 | `reverse-integer` | fail | fail | S-009 | S-011 | Error: ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execut |
| 8 | `string-to-integer-atoi` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 9 | `palindrome-number` | fail | fail | S-009 | S-011 | Error: ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execut |
| 10 | `regular-expression-matching` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 11 | `container-with-most-water` | fail | fail | S-006 | S-008 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 12 | `integer-to-roman` | fail | fail | S-010 | S-010 | Error: mathematica(ast): error node |
| 13 | `roman-to-integer` | fail | fail | S-010 | S-016 | Error: mathematica(ast): error node |
| 14 | `longest-common-prefix` | fail | fail | S-010 | S-010 | Error: ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execut |
| 15 | `3sum` | fail | fail | S-013 | S-013 | Error: ATHENA_UNSUPPORTED_OPERATION details={backend=athena-vm, component=execut |
| 16 | `3sum-closest` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 17 | `letter-combinations-of-a-phone-number` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 18 | `4sum` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 19 | `remove-nth-node-from-end-of-list` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 20 | `valid-parentheses` | fail | fail | S-010 | S-011 | Error: mathematica(ast): error node |
| 21 | `merge-two-sorted-lists` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 22 | `generate-parentheses` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 23 | `merge-k-sorted-lists` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 24 | `swap-nodes-in-pairs` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 25 | `reverse-nodes-in-k-group` | fail | fail | S-012 | S-012 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 26 | `remove-duplicates-from-sorted-array` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 27 | `remove-element` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 28 | `find-the-index-of-the-first-occurrence-in-a-string` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 29 | `divide-two-integers` | fail | fail | S-004 | S-004 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 30 | `substring-with-concatenation-of-all-words` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 31 | `next-permutation` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 32 | `longest-valid-parentheses` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 33 | `search-in-rotated-sorted-array` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 34 | `find-first-and-last-position-of-element-in-sorted-array` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 35 | `search-insert-position` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 36 | `valid-sudoku` | fail | fail | S-014 | S-014 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 37 | `sudoku-solver` | fail | fail | S-014 | S-014 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 38 | `count-and-say` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 39 | `combination-sum` | fail | fail | S-015 | S-015 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 40 | `combination-sum-ii` | fail | fail | S-015 | S-015 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 41 | `first-missing-positive` | fail | fail | S-016 | S-016 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 42 | `trapping-rain-water` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 43 | `multiply-strings` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 44 | `wildcard-matching` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |
| 45 | `jump-game-ii` | fail | fail | S-017 | S-017 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 46 | `permutations` | fail | fail | S-015 | S-015 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 47 | `permutations-ii` | fail | fail | S-013 | S-013 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 48 | `rotate-image` | fail | fail | S-014 | S-014 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 49 | `group-anagrams` | fail | fail | S-010 | S-010 | Error: term_not_json_surface:unevaluated_application head=extension argc=1 |
| 50 | `powx-n` | fail | fail | S-015 | S-015 | Error: term_not_json_surface:unevaluated_application head=extension argc=2 |

