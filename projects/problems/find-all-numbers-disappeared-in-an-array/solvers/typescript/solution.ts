export class Solution {
    findDisappearedNumbers(nums: number[]): number[] {
        for (const num of nums) {
            const idx = Math.abs(num) - 1;
            if (nums[idx] > 0) {
                nums[idx] = -nums[idx];
            }
        }
        const ans: number[] = [];
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                ans.push(i + 1);
            }
        }
        return ans;
    }
}
