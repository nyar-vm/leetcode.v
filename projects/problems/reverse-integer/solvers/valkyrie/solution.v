namespace leetcode.reverse_integer;

[export(case: "camelCase")]
micro reverse(x: i64) -> i64 {
    let mi: i64 = -2147483648
    let mx: i64 = 2147483647
    let mut n: i64 = x
    let mut ans: i64 = 0
    while n != 0 {
        if ans < mi / 10 + 1 || ans > mx / 10 {
            return 0
        }
        let mut y: i64 = n % 10
        if n < 0 && y > 0 {
            y = y - 10
        }
        ans = ans * 10 + y
        n = (n - y) / 10
    }
    return ans
}

class Solution {
    micro reverse(self, x: i64): i64 {
        return reverse(x)
    }
}
