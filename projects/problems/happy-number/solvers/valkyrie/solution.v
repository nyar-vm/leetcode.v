namespace leetcode.happy_number;

class Solution {
    micro isHappy(self, n: i64): bool {
        let mut seen: HashSet<i64> = HashSet::new()
        while n != 1 {
            if seen.contains(n) {
                return false
            }
            seen.insert(n)
            n = sum_square_digits(n)
        }
        return true
    }

    micro sum_square_digits(self, mut n: i64): i64 {
        let mut sum: i64 = 0
        while n != 0 {
            let d: i64 = n % 10
            sum = sum + d * d
            n = n / 10
        }
        return sum
    }
}
