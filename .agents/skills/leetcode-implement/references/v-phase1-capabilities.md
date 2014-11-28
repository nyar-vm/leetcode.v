# V 现阶段（phase 1）实现备忘

与 coach 首批题对齐，优先使用：

| 能力                             | namespace              | 典型题                              |
|----------------------------------|------------------------|-------------------------------------|
| `ArrayList<T>` + `while` + `⁅i⁆` | `std.collection`       | 数组扫描                            |
| `HashMap<K,V>`                   | `std.collection`       | two-sum、contains-duplicate、intersection-of-two-arrays-ii |
| `HashSet<T>`                     | `std.collection`       | contains-duplicate、happy-number                          |
| `i64` 异或 `^`                   | `core`                 | single-number、missing-number       |
| 滚动变量                         | —                      | climbing-stairs、maxProfit、Kadane  |
| 双指针交换 /  compaction       | `ArrayList`            | reverse-string、move-zeroes、remove-duplicates-from-sorted-array、remove-element、squares-of-a-sorted-array、merge-sorted-array |
| 排序 + 贪心双指针              | `quick_sort` + `ArrayList` | assign-cookies                          |
| 摩尔投票 / 数字反转              | 标量                   | majority-element、palindrome-number |
| 长度 26 计数表                   | `[i64]` + `utf8.char_at` / `char.lowercase_ascii_index` | valid-anagram |
| 字符串双指针 + ASCII 字母数字    | `utf8.char_at` + `char as u32` | valid-palindrome |

暂缓：链表、树、优先队列、并查集、多维 DP 表。
