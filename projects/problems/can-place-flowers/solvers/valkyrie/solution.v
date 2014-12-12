namespace leetcode.can_place_flowers;

class Solution {
    micro canPlaceFlowers(mut self, flowerbed: ArrayList<i64>, n: i64): bool {
        let len: usize = flowerbed.length()
        let mut remaining: i64 = n
        let mut i: usize = 0
        while i < len {
            if flowerbed⁅i⁆.unwrap() != 0 {
                i = i + 1
                continue
            }
            let left_empty: bool = i == 0 || flowerbed⁅i - 1⁆.unwrap() == 0
            let right_empty: bool = i + 1 >= len || flowerbed⁅i + 1⁆.unwrap() == 0
            if left_empty && right_empty {
                flowerbed⁅i⁆ = 1
                remaining = remaining - 1
                if remaining <= 0 {
                    return true
                }
            }
            i = i + 1
        }
        return remaining <= 0
    }
}
