namespace leetcode.valid_palindrome;

class Solution {
    micro isPalindrome(self, s: utf8): bool {
        let n: i32 = s.length()
        let mut i: i32 = 0
        let mut j: i32 = n - 1
        while i < j {
            let left: char = s.char_at(i).unwrap()
            let right: char = s.char_at(j).unwrap()
            if !self.is_alnum(left) {
                i = i + 1
            } else if !self.is_alnum(right) {
                j = j - 1
            } else if self.alnum_key(left) != self.alnum_key(right) {
                return false
            } else {
                i = i + 1
                j = j - 1
            }
        }
        return true
    }

    micro is_alnum(self, ch: char): bool {
        let code: u32 = ch as u32
        if code >= 48 && code <= 57 {
            return true
        }
        if code >= 65 && code <= 90 {
            return true
        }
        if code >= 97 && code <= 122 {
            return true
        }
        return false
    }

    micro alnum_key(self, ch: char): i64 {
        let code: u32 = ch as u32
        if code >= 65 && code <= 90 {
            return (code + 32) as i64
        }
        return code as i64
    }
}
