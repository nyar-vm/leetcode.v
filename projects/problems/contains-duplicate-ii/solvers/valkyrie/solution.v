namespace leetcode.contains_duplicate_ii;

class Solution {
    micro containsNearbyDuplicate(self, nums: ArrayList<i64>, k: i64): bool {
        let mut last: HashMap<i64, i64> = HashMap::new(0)
        let mut i: usize = 0
        while i < nums.length() {
            let x: i64 = nums⁅i⁆.unwrap()
            if last.contains_key(x) {
                let prev: i64 = last.get(x).unwrap()
                if (i as i64) - prev <= k {
                    return true
                }
            }
            last.insert(x, i as i64)
            i = i + 1
        }
        return false
    }
}
