export class Solution {
    sortedSquares(nums: number[]): number[] {
        const ans: number[] = [];
        let i = 0;
        let j = nums.length - 1;
        while (i <= j) {
            const a = nums[i] * nums[i];
            const b = nums[j] * nums[j];
            if (a > b) {
                ans.push(a);
                i++;
            } else {
                ans.push(b);
                j--;
            }
        }
        ans.reverse();
        return ans;
    }
}
