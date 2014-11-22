namespace leetcode.remove_element;

class Solution {
    micro removeElement(mut self, nums: ArrayList<i64>, val: i64): i64 {
        let mut k: usize = 0
        loop x in nums {
            if x != val {
                nums⁅k⁆ = x
                k = k + 1
            }
        }
        return k as i64
    }
}
