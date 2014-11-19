export class Solution {
    intersect(nums1: number[], nums2: number[]): number[] {
        const cnt = new Map<number, number>();
        for (const x of nums1) {
            cnt.set(x, (cnt.get(x) ?? 0) + 1);
        }
        const ans: number[] = [];
        for (const x of nums2) {
            const c = cnt.get(x) ?? 0;
            if (c > 0) {
                ans.push(x);
                cnt.set(x, c - 1);
            }
        }
        return ans;
    }
}
