namespace leetcode.maximum_subarray;

class Solution {
    micro maxSubArray(self, nums: ArrayList<i64>): i64 {
        let mut ans: i64 = nums⁅0⁆.unwrap()
        let mut cur: i64 = nums⁅0⁆.unwrap()
        let mut i: usize = 1
        while i < nums.length() {
            let x: i64 = nums⁅i⁆.unwrap()
            if x > cur + x {
                cur = x
            } else {
                cur = cur + x
            }
            if cur > ans {
                ans = cur
            }
            i = i + 1
        }
        return ans
    }
}
