namespace leetcode.string_to_integer_atoi;

# 阻塞：SMIR003 — `utf8.char_at` wasm 宿主导调用未接线

[export(case: "camelCase")]
micro my_atoi(s: utf8) -> i64 {
    let n: i32 = s.length()
    if n == 0 {
        return 0
    }
    let mut i: i32 = 0
    while i < n {
        let ch: char = s.char_at(i).unwrap()
        if ch as u32 != 32 {
            break
        }
        i = i + 1
    }
    if i >= n {
        return 0
    }
    let mut sign: i64 = 1
    let first: char = s.char_at(i).unwrap()
    if first as u32 == 45 {
        sign = -1
        i = i + 1
    } else if first as u32 == 43 {
        i = i + 1
    }
    let mx: i64 = 2147483647
    let mi: i64 = -2147483648
    let flag: i64 = mx / 10
    let mut res: i64 = 0
    while i < n {
        let ch: char = s.char_at(i).unwrap()
        if !ch.is_ascii_digit() {
            break
        }
        let digit: i64 = (ch as u32 - 48) as i64
        if res > flag || (res == flag && digit > 7) {
            return if sign > 0 { mx } else { mi }
        }
        res = res * 10 + digit
        i = i + 1
    }
    return sign * res
}

class Solution {
    micro myAtoi(self, s: utf8): i64 {
        return my_atoi(s)
    }
}
