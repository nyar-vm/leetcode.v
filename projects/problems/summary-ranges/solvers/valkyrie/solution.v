namespace leetcode.summary_ranges;

class Solution {
    micro summaryRanges(self, nums: ArrayList<i64>): ArrayList<utf8> {
        let mut ans: ArrayList<utf8> = ArrayList::new(nums.length())
        let mut i: usize = 0
        let n: usize = nums.length()
        while i < n {
            let mut j: usize = i
            while j + 1 < n && nums⁅j + 1⁆.unwrap() == nums⁅j⁆.unwrap() + 1 {
                j = j + 1
            }
            ans.push(self.format_range(nums⁅i⁆.unwrap(), nums⁅j⁆.unwrap()))
            i = j + 1
        }
        return ans
    }

    micro format_range(self, start: i64, end: i64): utf8 {
        let mut builder: Utf8Builder = Utf8Builder::new(32)
        builder.append_i64(start)
        if start != end {
            builder.append(Utf8Text::from_bytes([45, 62]))
            builder.append_i64(end)
        }
        return builder.build()
    }
}
