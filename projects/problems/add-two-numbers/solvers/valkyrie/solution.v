namespace leetcode.add_two_numbers;

# 阻塞：SMIR010 — `ArrayList::new` / `push` 在 wasm 降低时 layout 合同失败（见 `valkyrie-evolution` backlog V-017c）

[export(case: "camelCase")]
micro add_two_numbers(l1: ArrayList<i64>, l2: ArrayList<i64>) -> ArrayList<i64> {
    let mut result: ArrayList<i64> = ArrayList::new(0)
    let mut i: usize = 0
    let mut carry: i64 = 0
    while i < l1.length() || i < l2.length() || carry != 0 {
        let mut d1: i64 = 0
        let mut d2: i64 = 0
        if i < l1.length() {
            d1 = l1⁅i⁆.unwrap()
        }
        if i < l2.length() {
            d2 = l2⁅i⁆.unwrap()
        }
        let s: i64 = d1 + d2 + carry
        carry = s / 10
        result.push(s % 10)
        i = i + 1
    }
    return result
}

class Solution {
    micro addTwoNumbers(self, l1: ArrayList<i64>, l2: ArrayList<i64>): ArrayList<i64> {
        return add_two_numbers(l1, l2)
    }
}
