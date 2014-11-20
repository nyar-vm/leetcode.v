export class Solution {
    removeDuplicates(nums: number[]): number {
        let k = 0;
        for (const x of nums) {
            if (k === 0 || x !== nums[k - 1]) {
                nums[k] = x;
                k++;
            }
        }
        return k;
    }
}
