namespace leetcode.two_sum;

# wasm invoke 入口：V 侧 snake_case，导出符号 camelCase 对齐 metadata.invoke
[export(case: "camelCase")]
micro two_sum(nums: ArrayList<i64>, target: i64): ArrayList<i64> {
    return Solution().two_sum(nums, target)
}

class Solution {
    micro two_sum(self, nums: ArrayList<i64>, target: i64): ArrayList<i64> {
        let mut index: HashMap<i64, i64> = HashMap::new(0)
        let mut i: usize = 0
        while i < nums.length() {
            let x: i64 = nums⁅i⁆.unwrap()
            let need: i64 = target - x
            if index.contains_key(need) {
                let mut result: ArrayList<i64> = ArrayList::new(2)
                result.push(index.get(need).unwrap())
                result.push(i as i64)
                return result
            }
            index.insert(x, i as i64)
            i = i + 1
        }
        return ArrayList::new(0)
    }
}
