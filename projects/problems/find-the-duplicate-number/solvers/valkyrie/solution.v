namespace leetcode.find_the_duplicate_number;

class Solution {
    micro findDuplicate(self, nums: ArrayList<i64>): i64 {
        let mut slow: i64 = nums⁅0⁆.unwrap()
        let mut fast: i64 = nums⁅0⁆.unwrap()
        while true {
            slow = self.next(nums, slow)
            fast = self.next(nums, self.next(nums, fast))
            if slow == fast {
                break
            }
        }
        slow = nums⁅0⁆.unwrap()
        while slow != fast {
            slow = self.next(nums, slow)
            fast = self.next(nums, fast)
        }
        return slow
    }

    micro next(self, nums: ArrayList<i64>, index: i64): i64 {
        return nums⁅index as usize⁆.unwrap()
    }
}
