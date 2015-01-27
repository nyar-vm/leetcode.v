namespace leetcode.longest_palindromic_substring;

# 阻塞：SMIR003 — `utf8.char_at` wasm 调用合同未接线（中心扩展需逐字符比较）

[export(case: "camelCase")]
micro longest_palindrome(s: utf8) -> utf8 {
    let n: i32 = s.length()
    if n <= 1 {
        return s
    }
    let mut best_start: i32 = 0
    let mut best_len: i32 = 1
    let mut center: i32 = 0
    let last_center: i32 = 2 * n - 2
    while center <= last_center {
        let mut l: i32 = center / 2
        let mut r: i32 = (center + 1) / 2
        while l >= 0 && r < n {
            if s.char_at(l).unwrap() != s.char_at(r).unwrap() {
                break
            }
            let len: i32 = r - l + 1
            if len > best_len {
                best_len = len
                best_start = l
            }
            l = l - 1
            r = r + 1
        }
        center = center + 1
    }
    let mut builder: Utf8Builder = Utf8Builder::new(best_len)
    let mut k: i32 = 0
    while k < best_len {
        builder.append(s.char_at(best_start + k).unwrap())
        k = k + 1
    }
    return builder.build()
}

class Solution {
    micro longestPalindrome(self, s: utf8): utf8 {
        return longest_palindrome(s)
    }
}
