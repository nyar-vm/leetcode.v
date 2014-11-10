export class Solution {
    majorityElement(nums: number[]): number {
        let candidate = nums[0];
        let count = 0;
        for (const x of nums) {
            if (count === 0) {
                candidate = x;
                count = 1;
            } else if (x === candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}
