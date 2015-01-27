namespace leetcode.roman_to_integer;

# 阻塞：SMIR003 — `utf8.char_at` wasm 宿主导调用未接线（见 `valkyrie-evolution` backlog V-017）

micro roman_value(c: char) -> i64 {
    let code: u32 = c as u32
    if code == 73 {
        return 1
    }
    if code == 86 {
        return 5
    }
    if code == 88 {
        return 10
    }
    if code == 76 {
        return 50
    }
    if code == 67 {
        return 100
    }
    if code == 68 {
        return 500
    }
    return 1000
}

[export(case: "camelCase")]
micro roman_to_int(s: utf8) -> i64 {
    let len: i32 = s.length()
    if len == 0 {
        return 0
    }
    let mut sum: i64 = roman_value(s.char_at(len - 1).unwrap())
    let mut i: i32 = 0
    while i < len - 1 {
        let a: i64 = roman_value(s.char_at(i).unwrap())
        let b: i64 = roman_value(s.char_at(i + 1).unwrap())
        if a < b {
            sum = sum - a
        } else {
            sum = sum + a
        }
        i = i + 1
    }
    return sum
}

class Solution {
    micro romanToInt(self, s: utf8): i64 {
        return roman_to_int(s)
    }
}
