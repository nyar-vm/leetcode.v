export class Solution {
    threeSumClosest(nums: number[], target: number): number {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        let ans = Number.POSITIVE_INFINITY;
        for (let i = 0; i < n; i++) {
            const v = nums[i];
            let j = i + 1;
            let k = n - 1;
            while (j < k) {
                const t = v + nums[j] + nums[k];
                if (t === target) {
                    return t;
                }
                if (Math.abs(t - target) < Math.abs(ans - target)) {
                    ans = t;
                }
                if (t > target) {
                    k -= 1;
                } else {
                    j += 1;
                }
            }
        }
        return ans;
    }
}
