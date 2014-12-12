export class Solution {
    findLengthOfLCIS(nums: number[]): number {
        let ans = 1;
        let cnt = 1;
        for (let i = 1; i < nums.length; i += 1) {
            if (nums[i - 1] < nums[i]) {
                cnt += 1;
                if (cnt > ans) {
                    ans = cnt;
                }
            } else {
                cnt = 1;
            }
        }
        return ans;
    }
}
