namespace leetcode.plus_one;

class Solution {
    micro plusOne(mut self, digits: ArrayList<i64>): ArrayList<i64> {
        let mut i: i64 = digits.length() as i64 - 1
        while i >= 0 {
            let idx: usize = i as usize
            let d: i64 = digits⁅idx⁆.unwrap()
            if d < 9 {
                digits⁅idx⁆ = d + 1
                return digits
            }
            digits⁅idx⁆ = 0
            i = i - 1
        }
        let mut result: ArrayList<i64> = ArrayList::new(digits.length() + 1)
        result.push(1)
        let mut j: usize = 0
        while j < digits.length() {
            result.push(0)
            j = j + 1
        }
        return result
    }
}
