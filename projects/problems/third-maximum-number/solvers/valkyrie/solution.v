namespace leetcode.third_maximum_number;

class Solution {
    micro thirdMax(self, nums: ArrayList<i64>): i64 {
        let mut m1: Option<i64> = None
        let mut m2: Option<i64> = None
        let mut m3: Option<i64> = None
        loop num in nums {
            if self.equals_opt(m1, num) || self.equals_opt(m2, num) || self.equals_opt(m3, num) {
                continue
            }
            if m1.is_none() || num > m1.unwrap() {
                m3 = m2
                m2 = m1
                m1 = Some(num)
            } else if m2.is_none() || num > m2.unwrap() {
                m3 = m2
                m2 = Some(num)
            } else if m3.is_none() || num > m3.unwrap() {
                m3 = Some(num)
            }
        }
        if m3.is_some() {
            return m3.unwrap()
        }
        return m1.unwrap()
    }

    micro equals_opt(self, value: Option<i64>, num: i64): bool {
        match value {
            case Some(x):
                return x == num
            case None:
                return false
        }
    }
}
