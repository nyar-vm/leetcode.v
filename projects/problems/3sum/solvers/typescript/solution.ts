export class Solution {
    threeSum(nums: number[]): number[][] {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const ans: number[][] = [];
        for (let i = 0; i < n - 2; i++) {
            if (nums[i] > 0) {
                break;
            }
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }
            let j = i + 1;
            let k = n - 1;
            while (j < k) {
                const x = nums[i] + nums[j] + nums[k];
                if (x < 0) {
                    j += 1;
                } else if (x > 0) {
                    k -= 1;
                } else {
                    ans.push([nums[i], nums[j], nums[k]]);
                    j += 1;
                    k -= 1;
                    while (j < k && nums[j] === nums[j - 1]) {
                        j += 1;
                    }
                    while (j < k && nums[k] === nums[k + 1]) {
                        k -= 1;
                    }
                }
            }
        }
        return ans;
    }
}
