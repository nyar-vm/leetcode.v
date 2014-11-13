namespace leetcode.climbing_stairs;

class Solution {
    micro climbStairs(self, n: i64): i64 {
        if n <= 2 {
            return n
        }
        let mut a: i64 = 1
        let mut b: i64 = 2
        let mut i: i64 = 3
        while i <= n {
            let next: i64 = a + b
            a = b
            b = next
            i = i + 1
        }
        return b
    }
}
