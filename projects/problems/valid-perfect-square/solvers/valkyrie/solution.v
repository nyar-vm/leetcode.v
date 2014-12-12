namespace leetcode.valid_perfect_square;

class Solution {
    micro isPerfectSquare(self, num: i64): bool {
        if num < 2 {
            return true
        }
        let mut lo: i64 = 2
        let mut hi: i64 = num
        while lo <= hi {
            let mid: i64 = lo + (hi - lo) / 2
            let sq: i64 = mid * mid
            if sq == num {
                return true
            }
            if sq < num {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return false
    }
}
