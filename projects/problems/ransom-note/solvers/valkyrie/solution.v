namespace leetcode.ransom_note;

class Solution {
    micro canConstruct(self, ransomNote: utf8, magazine: utf8): bool {
        let mut counts: [i64] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
        let mut j: i32 = 0
        while j < magazine.length() {
            let idx: usize = magazine.char_at(j).unwrap().lowercase_ascii_index().unwrap() as usize
            counts⁅idx⁆ = counts⁅idx⁆ + 1
            j = j + 1
        }
        let mut i: i32 = 0
        while i < ransomNote.length() {
            let idx: usize = ransomNote.char_at(i).unwrap().lowercase_ascii_index().unwrap() as usize
            counts⁅idx⁆ = counts⁅idx⁆ - 1
            if counts⁅idx⁆ < 0 {
                return false
            }
            i = i + 1
        }
        return true
    }
}
