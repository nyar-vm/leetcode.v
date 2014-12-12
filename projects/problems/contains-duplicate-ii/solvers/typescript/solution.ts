export class Solution {
    containsNearbyDuplicate(nums: number[], k: number): boolean {
        const last = new Map<number, number>();
        for (let i = 0; i < nums.length; i++) {
            const x = nums[i];
            const prev = last.get(x);
            if (prev !== undefined && i - prev <= k) {
                return true;
            }
            last.set(x, i);
        }
        return false;
    }
}
