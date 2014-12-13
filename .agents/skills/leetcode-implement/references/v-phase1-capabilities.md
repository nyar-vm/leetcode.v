# V 现阶段（phase 1）实现备忘

与 coach 首批题对齐，优先使用：

| 能力                             | namespace              | 典型题                              |
|----------------------------------|------------------------|-------------------------------------|
| `ArrayList<T>` + `while` + `⁅i⁆` | `std.collection`       | 数组扫描                            |
| `HashMap<K,V>`                   | `std.collection`       | two-sum、contains-duplicate、intersection-of-two-arrays-ii、contains-duplicate-ii |
| `HashSet<T>`                     | `std.collection`       | contains-duplicate、happy-number                          |
| `i64` 异或 `^`                   | `core`                 | single-number、missing-number       |
| 滚动变量                         | —                      | climbing-stairs、maxProfit（I）、Kadane、**stock II 差价累加**、third-maximum-number |
| 双指针交换 /  compaction       | `ArrayList`            | reverse-string、move-zeroes、remove-duplicates-from-sorted-array、remove-element、squares-of-a-sorted-array、merge-sorted-array |
| 排序 + 贪心双指针              | `quick_sort` + `ArrayList` | assign-cookies                          |
| 线性贪心扫描                   | `ArrayList` + 邻域判断 | can-place-flowers                       |
| 原地索引标记                   | `ArrayList<i64>` 负号编码 | find-all-numbers-disappeared-in-an-array |
| Floyd 快慢指针（隐式链表）     | `ArrayList` 下标跳转   | find-the-duplicate-number               |
| 线性扫描 + 区间格式化          | `Utf8Builder.append_i64` | summary-ranges                          |
| 相邻比较滚动计数               | `ArrayList` + 标量       | longest-continuous-increasing-subsequence |
| 26 槽字母频次表                | `char.lowercase_ascii_index` + `[i64]` | ransom-note（同 valid-anagram 模式） |
| 整数二分 + i64 乘法            | 标量 `i64`               | valid-perfect-square                    |
| 摩尔投票 / 数字反转              | 标量                   | majority-element、palindrome-number |
| 长度 26 计数表                   | `[i64]` + `utf8.char_at` / `char.lowercase_ascii_index` | valid-anagram |
| 字符串双指针 + ASCII 字母数字    | `utf8.char_at` + `char.is_ascii_*` | valid-palindrome、reverse-vowels-of-a-string、**is-subsequence** |

暂缓：链表、树、优先队列、并查集、多维 DP 表。
