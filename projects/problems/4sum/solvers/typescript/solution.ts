export class Solution {
    fourSum(nums: number[], target: number): number[][] {
        const n = nums.length;
        const ans: number[][] = [];
        if (n < 4) {
            return ans;
        }
        nums.sort((a, b) => a - b);
        for (let i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }
            for (let j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) {
                    continue;
                }
                let k = j + 1;
                let l = n - 1;
                while (k < l) {
                    const x = nums[i] + nums[j] + nums[k] + nums[l];
                    if (x < target) {
                        k += 1;
                    } else if (x > target) {
                        l -= 1;
                    } else {
                        ans.push([nums[i], nums[j], nums[k], nums[l]]);
                        k += 1;
                        l -= 1;
                        while (k < l && nums[k] === nums[k - 1]) {
                            k += 1;
                        }
                        while (k < l && nums[l] === nums[l + 1]) {
                            l -= 1;
                        }
                    }
                }
            }
        }
        return ans;
    }
}
