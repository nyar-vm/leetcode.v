namespace leetcode.contains_duplicate;

class Solution {
    micro containsDuplicate(self, nums: ArrayList<i64>): bool {
        let mut seen: HashSet<i64> = HashSet::new()
        loop x in nums {
            if seen.contains(x) {
                return true
            }
            seen.insert(x)
        }
        return false
    }
}
