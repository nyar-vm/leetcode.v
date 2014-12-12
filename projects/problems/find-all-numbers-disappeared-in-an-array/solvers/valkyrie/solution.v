namespace leetcode.find_all_numbers_disappeared_in_an_array;

class Solution {
    micro findDisappearedNumbers(mut self, nums: ArrayList<i64>): ArrayList<i64> {
        loop num in nums {
            let abs_num: i64 = num
            if abs_num < 0 {
                abs_num = -abs_num
            }
            let idx: usize = (abs_num - 1) as usize
            let marked: i64 = nums⁅idx⁆.unwrap()
            if marked > 0 {
                nums⁅idx⁆ = -marked
            }
        }
        let mut ans: ArrayList<i64> = ArrayList::new(0)
        let mut i: usize = 0
        while i < nums.length() {
            if nums⁅i⁆.unwrap() > 0 {
                ans.push((i + 1) as i64)
            }
            i = i + 1
        }
        return ans
    }
}
