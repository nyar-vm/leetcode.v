namespace leetcode.longest_continuous_increasing_subsequence;

class Solution {
    micro findLengthOfLCIS(self, nums: ArrayList<i64>): i64 {
        let n: usize = nums.length()
        let mut ans: i64 = 1
        let mut cnt: i64 = 1
        let mut i: usize = 1
        while i < n {
            if nums⁅i - 1⁆.unwrap() < nums⁅i⁆.unwrap() {
                cnt = cnt + 1
                if cnt > ans {
                    ans = cnt
                }
            } else {
                cnt = 1
            }
            i = i + 1
        }
        return ans
    }
}
