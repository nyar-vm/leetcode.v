export class Solution {
    maxSubArray(nums: number[]): number {
        let ans = nums[0];
        let cur = nums[0];
        for (let i = 1; i < nums.length; i++) {
            const x = nums[i];
            cur = Math.max(x, cur + x);
            ans = Math.max(ans, cur);
        }
        return ans;
    }
}
