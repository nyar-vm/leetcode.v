# SXO 批量补题 Gap（catalog 前 N 题）

生成时间：2026-09-24T08:42:00.433Z

批量范围：catalog 前 **50** 题（与 `LEETCODE_BATCH_LIMIT` / batch-limit 默认一致）。

能力 backlog 主表：`.agents/skills/sxo-evolution/references/capability-backlog.md`

## 汇总

| 语言 | 测例全绿 | 失败 |
|------|----------|------|
| Wolfram (Sxo) | 3 | 47 |
| MATLAB (Sxo) | 0 | 50 |

## Gap 频次（失败题）

| Gap ID | 次数 | 说明 |
|--------|------|------|
| S-004 | 2 | 循环 / 控制流 evaluate 未稳定（总类） |
| S-006 | 2 | Wolfram `Do` / `Return` / 嵌套循环 |
| S-008 | 2 | MATLAB `function` + `for` + `return` |
| S-009 | 2 | Wolfram `:=` 用户函数求值为 `Null` |
| S-010 | 34 | 字符串 Part / 字符访问 |
| S-011 | 3 | MATLAB 用户函数体 `error node` |
| S-012 | 11 | 链表（数组模拟） |
| S-013 | 23 | 排序 / 双指针多指针 |
| S-014 | 5 | 二维矩阵 |
| S-015 | 8 | 回溯 / 递归 / DFS |
| S-016 | 3 | 哈希 / 关联结构 |
| S-017 | 2 | 正则 / 通配 / DP 表 |

## 逐题

| # | slug | Wolfram | MATLAB | Gap (W) | Gap (M) | 摘要 |
|---|------|---------|--------|---------|---------|------|
| 1 | `two-sum` | fail | fail | S-006 | S-008 | Error: tests[0]: expected [0,1], got null |
| 2 | `add-two-numbers` | fail | fail | S-012 | S-012 | Error: tests[0]: expected [0,1,1,1], got null |
| 3 | `longest-substring-without-repeating-characters` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 3, got null |
| 4 | `median-of-two-sorted-arrays` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 225, got null |
| 5 | `longest-palindromic-substring` | fail | fail | S-010 | S-010 | Error: tests[0]: expected "abba", got null |
| 6 | `zigzag-conversion` | fail | fail | S-010 | S-010 | Error: tests[0]: expected "PINALSIGYAHRPI", got null |
| 7 | `reverse-integer` | fail | fail | S-009 | S-011 | Error: tests[0]: expected -2143847412, got null |
| 8 | `string-to-integer-atoi` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 2147483647, got null |
| 9 | `palindrome-number` | fail | fail | S-009 | S-011 | Error: tests[0]: expected true, got null |
| 10 | `regular-expression-matching` | fail | fail | S-010 | S-010 | Error: tests[0]: expected true, got null |
| 11 | `container-with-most-water` | fail | fail | S-006 | S-008 | Error: tests[0]: expected 1, got null |
| 12 | `integer-to-roman` | fail | fail | S-010 | S-010 | Error: mathematica(ast): error node |
| 13 | `roman-to-integer` | fail | fail | S-010 | S-016 | Error: mathematica(ast): error node |
| 14 | `longest-common-prefix` | fail | fail | S-010 | S-010 | Error: tests[0]: expected "hel", got null |
| 15 | `3sum` | fail | fail | S-013 | S-013 | Error: tests[0]: expected [[-2,0,2]], got null |
| 16 | `3sum-closest` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 82, got null |
| 17 | `letter-combinations-of-a-phone-number` | fail | fail | S-010 | S-010 | Error: tests[0]: expected ["jmpt","jmpu","jmpv","jmqt","jmqu","jmqv","jmrt","jmr |
| 18 | `4sum` | fail | fail | S-013 | S-013 | Error: tests[0]: expected [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]], got null |
| 19 | `remove-nth-node-from-end-of-list` | fail | fail | S-012 | S-012 | Error: tests[0]: expected [100,90,70,60], got null |
| 20 | `valid-parentheses` | fail | fail | S-010 | S-011 | Error: mathematica(ast): error node |
| 21 | `merge-two-sorted-lists` | fail | fail | S-012 | S-012 | Error: tests[0]: expected [1,1,1,1,1,1], got null |
| 22 | `generate-parentheses` | fail | fail | S-010 | S-010 | Error: tests[0]: expected ["(((((((())))))))","((((((()()))))))","((((((())()))) |
| 23 | `merge-k-sorted-lists` | pass | fail | S-012 | S-012 | Error: matlab(oak): error node |
| 24 | `swap-nodes-in-pairs` | fail | fail | S-012 | S-012 | Error: tests[0]: expected [2,1,4,3], got null |
| 25 | `reverse-nodes-in-k-group` | fail | fail | S-012 | S-012 | Error: tests[0]: expected [2,1], got null |
| 26 | `remove-duplicates-from-sorted-array` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 1, got null |
| 27 | `remove-element` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 0, got null |
| 28 | `find-the-index-of-the-first-occurrence-in-a-string` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 10, got null |
| 29 | `divide-two-integers` | fail | fail | S-004 | S-004 | Error: tests[0]: expected 3, got null |
| 30 | `substring-with-concatenation-of-all-words` | fail | fail | S-010 | S-010 | Error: tests[0]: expected [], got null |
| 31 | `next-permutation` | pass | fail | S-013 | S-013 | Error: matlab(oak): error node |
| 32 | `longest-valid-parentheses` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 6, got null |
| 33 | `search-in-rotated-sorted-array` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 1, got null |
| 34 | `find-first-and-last-position-of-element-in-sorted-array` | fail | fail | S-013 | S-013 | Error: tests[0]: expected [0,6], got null |
| 35 | `search-insert-position` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 1, got null |
| 36 | `valid-sudoku` | fail | fail | S-014 | S-014 | Error: tests[0]: expected false, got null |
| 37 | `sudoku-solver` | fail | fail | S-014 | S-014 | Error: tests[2]: expected "Error: invalid literal for int() with base 10: ''", n |
| 38 | `count-and-say` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 1113213211, got null |
| 39 | `combination-sum` | fail | fail | S-015 | S-015 | Error: tests[0]: expected [[1,1,1,1,1],[1,1,1,2],[1,1,1,2],[1,1,1,2],[1,2,2],[1, |
| 40 | `combination-sum-ii` | fail | fail | S-015 | S-015 | Error: tests[0]: expected [[1,1,1]], got null |
| 41 | `first-missing-positive` | fail | fail | S-016 | S-016 | Error: tests[0]: expected 1, got null |
| 42 | `trapping-rain-water` | fail | fail | S-013 | S-013 | Error: tests[0]: expected 11, got null |
| 43 | `multiply-strings` | fail | fail | S-010 | S-010 | Error: tests[0]: expected 8.888888888888889e+35, got null |
| 44 | `wildcard-matching` | fail | fail | S-010 | S-010 | Error: tests[0]: expected true, got null |
| 45 | `jump-game-ii` | fail | fail | S-017 | S-017 | Error: tests[0]: expected 32, got null |
| 46 | `permutations` | fail | fail | S-015 | S-015 | Error: tests[0]: expected [[1]], got null |
| 47 | `permutations-ii` | fail | fail | S-013 | S-013 | Error: tests[0]: expected [[0,0,0,1,9],[0,0,0,9,1],[0,0,1,0,9],[0,0,1,9,0],[0,0, |
| 48 | `rotate-image` | pass | fail | S-014 | S-014 | Error: matlab(oak): error node |
| 49 | `group-anagrams` | fail | fail | S-010 | S-010 | Error: tests[0]: expected [["a"],["b"],["c"],["d"],["e"]], got null |
| 50 | `powx-n` | fail | fail | S-015 | S-015 | Error: tests[0]: expected 1, got null |

