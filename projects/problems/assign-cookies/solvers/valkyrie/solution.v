namespace leetcode.assign_cookies;

class Solution {
    micro findContentChildren(mut self, g: ArrayList<i64>, s: ArrayList<i64>): i64 {
        quick_sort(g, self.cmp_i64)
        quick_sort(s, self.cmp_i64)
        let mut j: usize = 0
        let mut i: usize = 0
        while i < g.length() {
            let need: i64 = g⁅i⁆.unwrap()
            while j < s.length() && s⁅j⁆.unwrap() < need {
                j = j + 1
            }
            if j >= s.length() {
                return i as i64
            }
            j = j + 1
            i = i + 1
        }
        return g.length() as i64
    }

    micro cmp_i64(self, a: i64, b: i64): i32 {
        if a < b {
            return -1
        }
        if a > b {
            return 1
        }
        return 0
    }
}
