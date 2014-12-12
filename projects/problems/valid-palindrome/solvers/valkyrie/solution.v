namespace leetcode.valid_palindrome;

class Solution {
    micro isPalindrome(self, s: utf8): bool {
        let n: i32 = s.length()
        let mut i: i32 = 0
        let mut j: i32 = n - 1
        while i < j {
            let left: char = s.char_at(i).unwrap()
            let right: char = s.char_at(j).unwrap()
            if !left.is_ascii_alphanumeric() {
                i = i + 1
            } else if !right.is_ascii_alphanumeric() {
                j = j - 1
            } else if left.ascii_alnum_key().unwrap() != right.ascii_alnum_key().unwrap() {
                return false
            } else {
                i = i + 1
                j = j - 1
            }
        }
        return true
    }
}
