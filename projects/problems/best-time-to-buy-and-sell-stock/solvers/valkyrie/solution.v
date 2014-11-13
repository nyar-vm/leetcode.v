namespace leetcode.best_time_to_buy_and_sell_stock;

class Solution {
    micro maxProfit(self, prices: ArrayList<i64>): i64 {
        let mut min_price: i64 = 9223372036854775807
        let mut max_profit: i64 = 0
        loop price in prices {
            if price < min_price {
                min_price = price
            }
            let profit: i64 = price - min_price
            if profit > max_profit {
                max_profit = profit
            }
        }
        return max_profit
    }
}
