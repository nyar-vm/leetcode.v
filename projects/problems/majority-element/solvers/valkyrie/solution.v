namespace leetcode.majority_element;

class Solution {
    micro majorityElement(self, nums: ArrayList<i64>): i64 {
        let mut candidate: i64 = nums⁅0⁆.unwrap()
        let mut count: i64 = 0
        loop x in nums {
            if count == 0 {
                candidate = x
                count = 1
            } else if x == candidate {
                count = count + 1
            } else {
                count = count - 1
            }
        }
        return candidate
    }
}
