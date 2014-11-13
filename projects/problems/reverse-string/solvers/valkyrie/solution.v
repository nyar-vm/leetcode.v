namespace leetcode.reverse_string;

class Solution {
    micro reverseString(mut self, s: ArrayList<utf8>): unit {
        let mut i: usize = 0
        let mut j: usize = s.length()
        if j > 0 {
            j = j - 1
        }
        while i < j {
            let tmp: utf8 = s⁅i⁆.unwrap()
            s⁅i⁆ = s⁅j⁆.unwrap()
            s⁅j⁆ = tmp
            i = i + 1
            j = j - 1
        }
    }
}
