namespace leetcode.squares_of_a_sorted_array;

class Solution {
    micro sortedSquares(self, nums: ArrayList<i64>): ArrayList<i64> {
        let n: usize = nums.length()
        let mut i: usize = 0
        let mut j: usize = n
        if j > 0 {
            j = j - 1
        }
        let mut ans: ArrayList<i64> = ArrayList::new(0)
        while i <= j {
            let a: i64 = nums⁅i⁆.unwrap()
            let b: i64 = nums⁅j⁆.unwrap()
            let sq_left: i64 = a * a
            let sq_right: i64 = b * b
            if sq_left > sq_right {
                ans.push(sq_left)
                i = i + 1
            } else {
                ans.push(sq_right)
                if i == j {
                    i = i + 1
                } else {
                    j = j - 1
                }
            }
        }
        let mut l: usize = 0
        let mut r: usize = ans.length()
        if r > 0 {
            r = r - 1
        }
        while l < r {
            let tmp: i64 = ans⁅l⁆.unwrap()
            ans⁅l⁆ = ans⁅r⁆.unwrap()
            ans⁅r⁆ = tmp
            l = l + 1
            r = r - 1
        }
        return ans
    }
}
