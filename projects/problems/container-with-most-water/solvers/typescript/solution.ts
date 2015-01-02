export class Solution {
    maxArea(height: number[]): number {
        let l = 0;
        let r = height.length - 1;
        let ans = 0;
        while (l < r) {
            const t = Math.min(height[l], height[r]) * (r - l);
            ans = Math.max(ans, t);
            if (height[l] < height[r]) {
                l += 1;
            } else {
                r -= 1;
            }
        }
        return ans;
    }
}
