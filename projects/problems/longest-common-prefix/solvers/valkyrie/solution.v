namespace leetcode.longest_common_prefix;

# 阻塞：SMIR003 — `utf8.char_at` / `Utf8Builder` wasm 宿主导调用未接线（见 `valkyrie-evolution` backlog V-017）

micro empty_utf8() -> utf8 {
    let value: utf8 = Utf8Text::from_bytes([])
    return value
}

micro prefix_slice(source: utf8, end: i32) -> utf8 {
    let mut builder: Utf8Builder = Utf8Builder::new(end as usize)
    let mut k: i32 = 0
    while k < end {
        builder.append(source.char_at(k).unwrap())
        k = k + 1
    }
    let result: utf8 = builder.build()
    return result
}

[export(case: "camelCase")]
micro longest_common_prefix(strs: ArrayList<utf8>) -> utf8 {
    if strs.length() == 0 {
        return empty_utf8()
    }
    let first: utf8 = strs⁅0⁆.unwrap()
    let mut i: i32 = 0
    while i < first.length() {
        let mut j: usize = 1
        while j < strs.length() {
            let s: utf8 = strs⁅j⁆.unwrap()
            if s.length() <= i || s.char_at(i).unwrap() != first.char_at(i).unwrap() {
                return prefix_slice(first, i)
            }
            j = j + 1
        }
        i = i + 1
    }
    return first
}

class Solution {
    micro longestCommonPrefix(self, strs: ArrayList<utf8>): utf8 {
        return longest_common_prefix(strs)
    }
}
