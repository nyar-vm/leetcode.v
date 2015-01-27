namespace leetcode.container_with_most_water;

[export(case: "camelCase")]
micro max_area(height: ArrayList<i64>) -> i64 {
    let n: usize = height.length()
    if n < 2 {
        return 0
    }
    let mut l: usize = 0
    let mut r: usize = n - 1
    let mut ans: i64 = 0
    while l < r {
        let left: i64 = height⁅l⁆.unwrap()
        let right: i64 = height⁅r⁆.unwrap()
        let h: i64 = if left < right { left } else { right }
        let w: i64 = (r - l) as i64
        let area: i64 = h * w
        if area > ans {
            ans = area
        }
        if left < right {
            l = l + 1
        } else {
            r = r - 1
        }
    }
    return ans
}

class Solution {
    micro maxArea(self, height: ArrayList<i64>): i64 {
        return max_area(height)
    }
}
