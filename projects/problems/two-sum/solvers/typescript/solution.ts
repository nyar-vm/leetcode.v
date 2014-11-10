export class Solution {
    twoSum(nums: number[], target: number): number[] {
        const index = new Map<number, number>();
        for (let i = 0; i < nums.length; i++) {
            const x = nums[i];
            const need = target - x;
            if (index.has(need)) {
                return [index.get(need)!, i];
            }
            index.set(x, i);
        }
        return [];
    }
}
