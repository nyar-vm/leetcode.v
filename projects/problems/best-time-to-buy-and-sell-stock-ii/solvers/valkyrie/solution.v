namespace leetcode.best_time_to_buy_and_sell_stock_ii;

class Solution {
    micro maxProfit(self, prices: ArrayList<i64>): i64 {
        let mut ans: i64 = 0
        let mut i: usize = 1
        while i < prices.length() {
            let prev: i64 = prices⁅i - 1⁆.unwrap()
            let cur: i64 = prices⁅i⁆.unwrap()
            if cur > prev {
                ans = ans + (cur - prev)
            }
            i = i + 1
        }
        return ans
    }
}
