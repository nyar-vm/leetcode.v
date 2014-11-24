namespace leetcode.merge_sorted_array;

class Solution {
    micro merge(
        mut self,
        nums1: ArrayList<i64>,
        m: i64,
        nums2: ArrayList<i64>,
        n: i64,
    ): unit {
        let mut k: i64 = m + n - 1
        let mut i: i64 = m - 1
        let mut j: i64 = n - 1
        while j >= 0 {
            if i >= 0 && nums1⁅i as usize⁆.unwrap() > nums2⁅j as usize⁆.unwrap() {
                nums1⁅k as usize⁆ = nums1⁅i as usize⁆.unwrap()
                i = i - 1
            } else {
                nums1⁅k as usize⁆ = nums2⁅j as usize⁆.unwrap()
                j = j - 1
            }
            k = k - 1
        }
    }
}
