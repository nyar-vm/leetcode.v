namespace leetcode.reverse_vowels_of_a_string;

class Solution {
    micro reverseVowels(mut self, s: utf8): utf8 {
        let mut builder: Utf8Builder = Utf8Builder::new(s)
        let mut i: usize = 0
        let mut j: usize = builder.bytes.length()
        if j > 0 {
            j = j - 1
        }
        while i < j {
            while i < j && !self.is_vowel_at(builder, i) {
                i = i + 1
            }
            while i < j && !self.is_vowel_at(builder, j) {
                if j == 0 {
                    break
                }
                j = j - 1
            }
            if i < j {
                let tmp: u8 = builder.bytes⁅i⁆.unwrap()
                builder.bytes⁅i⁆ = builder.bytes⁅j⁆.unwrap()
                builder.bytes⁅j⁆ = tmp
                i = i + 1
                if i > j {
                    break
                }
                if j == 0 {
                    break
                }
                j = j - 1
            }
        }
        return builder.build()
    }

    micro is_vowel_at(self, builder: Utf8Builder, index: usize): bool {
        let b: u8 = builder.bytes⁅index⁆.unwrap()
        let ch: char = char::from(b as i64)
        return ch.is_ascii_vowel()
    }
}
