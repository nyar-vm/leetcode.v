export class Solution {
    removeElement(nums: number[], val: number): number {
        let k = 0;
        for (const x of nums) {
            if (x !== val) {
                nums[k] = x;
                k++;
            }
        }
        return k;
    }
}
