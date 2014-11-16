namespace leetcode.move_zeroes;

class Solution {
    micro moveZeroes(mut self, nums: ArrayList<i64>): unit {
        let mut k: usize = 0
        let mut i: usize = 0
        while i < nums.length() {
            let x: i64 = nums⁅i⁆.unwrap()
            if x != 0 {
                let tmp: i64 = nums⁅k⁆.unwrap()
                nums⁅k⁆ = x
                nums⁅i⁆ = tmp
                k = k + 1
            }
            i = i + 1
        }
    }
}
