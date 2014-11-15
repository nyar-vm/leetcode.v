namespace leetcode.valid_anagram;

class Solution {
    micro isAnagram(self, s: utf8, t: utf8): bool {
        if s.length() != t.length() {
            return false
        }
        let mut counts: [i64] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
        loop ch in s {
            let idx: usize = ch.lowercase_ascii_index().unwrap() as usize
            counts⁅idx⁆ = counts⁅idx⁆ + 1
        }
        loop ch in t {
            let idx: usize = ch.lowercase_ascii_index().unwrap() as usize
            counts⁅idx⁆ = counts⁅idx⁆ - 1
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
