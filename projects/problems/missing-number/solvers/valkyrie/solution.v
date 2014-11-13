namespace leetcode.missing_number;

class Solution {
    micro missingNumber(self, nums: ArrayList<i64>): i64 {
        let mut missing: i64 = nums.length() as i64
        let mut i: usize = 0
        while i < nums.length() {
            missing = missing.bit_xor(i as i64).bit_xor(nums⁅i⁆.unwrap())
            i = i + 1
        }
        return missing
    }
}
