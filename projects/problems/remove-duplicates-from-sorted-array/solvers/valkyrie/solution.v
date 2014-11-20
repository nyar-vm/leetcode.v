namespace leetcode.remove_duplicates_from_sorted_array;

class Solution {
    micro removeDuplicates(mut self, nums: ArrayList<i64>): i64 {
        let mut k: usize = 0
        loop x in nums {
            if k == 0 || x != nums⁅k - 1⁆.unwrap() {
                nums⁅k⁆ = x
                k = k + 1
            }
        }
        return k as i64
    }
}
