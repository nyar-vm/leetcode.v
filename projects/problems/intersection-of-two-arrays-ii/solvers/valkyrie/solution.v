namespace leetcode.intersection_of_two_arrays_ii;

class Solution {
    micro intersect(self, nums1: ArrayList<i64>, nums2: ArrayList<i64>): ArrayList<i64> {
        let mut cnt: HashMap<i64, i64> = HashMap::new(0)
        loop x in nums1 {
            if cnt.contains_key(x) {
                cnt.insert(x, cnt.get(x).unwrap() + 1)
            } else {
                cnt.insert(x, 1)
            }
        }
        let mut ans: ArrayList<i64> = ArrayList::new(0)
        loop x in nums2 {
            if cnt.contains_key(x) {
                let c: i64 = cnt.get(x).unwrap()
                if c > 0 {
                    ans.push(x)
                    cnt.insert(x, c - 1)
                }
            }
        }
        return ans
    }
}
