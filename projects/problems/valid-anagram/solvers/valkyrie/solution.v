namespace leetcode.valid_anagram;

class Solution {
    micro isAnagram(self, s: utf8, t: utf8): bool {
        if s.length() != t.length() {
            return false
        }
        let mut counts: [i64] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
        let mut i: i32 = 0
        while i < s.length() {
            let si: usize = self.letter_index(s, i)
            let ti: usize = self.letter_index(t, i)
            counts⁅si⁆ = counts⁅si⁆ + 1
            counts⁅ti⁆ = counts⁅ti⁆ - 1
            i = i + 1
        }
        let mut k: usize = 0
        while k < 26 {
            if counts⁅k⁆ != 0 {
                return false
            }
            k = k + 1
        }
        return true
    }
}

imply Solution {
    micro letter_index(self, text: utf8, index: i32): usize {
        let unit: utf8 = text.slice(index, 1)
        let alphabet: utf8 = "abcdefghijklmnopqrstuvwxyz"
        let mut offset: i32 = 0
        while offset < 26 {
            if unit == alphabet.slice(offset, 1) {
                return offset as usize
            }
            offset = offset + 1
        }
        return 0
    }
}
