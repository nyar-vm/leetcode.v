namespace leetcode.palindrome_number;

class Solution {
    micro isPalindrome(self, x: i64): bool {
        if x < 0 {
            return false
        }
        if x != 0 && x % 10 == 0 {
            return false
        }
        let mut left: i64 = x
        let mut reversed: i64 = 0
        while reversed < left {
            reversed = reversed * 10 + left % 10
            left = left / 10
        }
        return left == reversed || left == reversed / 10
    }
}
