namespace leetcode.single_number;

class Solution {
    micro singleNumber(self, nums: ArrayList<i64>): i64 {
        let mut ans: i64 = 0
        loop x in nums {
            ans = ans.bit_xor(x)
        }
        return ans
    }
}
