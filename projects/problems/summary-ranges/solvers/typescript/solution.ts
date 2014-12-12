export class Solution {
    summaryRanges(nums: number[]): string[] {
        const ans: string[] = [];
        let i = 0;
        while (i < nums.length) {
            let j = i;
            while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) {
                j += 1;
            }
            if (i === j) {
                ans.push(String(nums[i]));
            } else {
                ans.push(`${nums[i]}->${nums[j]}`);
            }
            i = j + 1;
        }
        return ans;
    }
}
