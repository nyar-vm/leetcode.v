namespace leetcode.valid_anagram;

class Solution {
    micro isAnagram(self, s: utf8, t: utf8): bool {
        if s.length() != t.length() {
            return false
        }
        let mut counts: [i64] = [0; 26]
        let mut i: i32 = 0
        while i < s.length() {
            let si: usize = s.char_at(i).unwrap().lowercase_ascii_index().unwrap() as usize
            let ti: usize = t.char_at(i).unwrap().lowercase_ascii_index().unwrap() as usize
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
