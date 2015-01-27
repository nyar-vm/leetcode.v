namespace leetcode.three_sum;

# 阻塞：SMIR010 — `ArrayList::new` / 嵌套 `ArrayList` wasm layout 合同失败（见 `valkyrie-evolution` backlog V-017c）

micro cmp_i64(a: i64, b: i64) -> i32 {
    if a < b {
        return -1
    }
    if a > b {
        return 1
    }
    return 0
}

[export(case: "camelCase")]
micro three_sum(mut nums: ArrayList<i64>) -> ArrayList<ArrayList<i64>> {
    quick_sort(nums, cmp_i64)
    let n: usize = nums.length()
    let mut ans: ArrayList<ArrayList<i64>> = ArrayList::new(0)
    let mut i: usize = 0
    while i + 2 < n {
        let vi: i64 = nums⁅i⁆.unwrap()
        if vi > 0 {
            break
        }
        if i > 0 && nums⁅i⁆.unwrap() == nums⁅i - 1⁆.unwrap() {
            i = i + 1
            continue
        }
        let mut j: usize = i + 1
        let mut k: usize = n - 1
        while j < k {
            let sum: i64 = vi + nums⁅j⁆.unwrap() + nums⁅k⁆.unwrap()
            if sum < 0 {
                j = j + 1
            } else if sum > 0 {
                k = k - 1
            } else {
                let mut triplet: ArrayList<i64> = ArrayList::new(3)
                triplet.push(nums⁅i⁆.unwrap())
                triplet.push(nums⁅j⁆.unwrap())
                triplet.push(nums⁅k⁆.unwrap())
                ans.push(triplet)
                j = j + 1
                k = k - 1
                while j < k && nums⁅j⁆.unwrap() == nums⁅j - 1⁆.unwrap() {
                    j = j + 1
                }
                while j < k && nums⁅k⁆.unwrap() == nums⁅k + 1⁆.unwrap() {
                    k = k - 1
                }
            }
        }
        i = i + 1
    }
    return ans
}

class Solution {
    micro threeSum(self, nums: ArrayList<i64>): ArrayList<ArrayList<i64>> {
        return three_sum(nums)
    }
}
