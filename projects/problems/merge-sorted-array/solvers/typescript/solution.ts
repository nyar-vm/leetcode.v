export class Solution {
    merge(nums1: number[], m: number, nums2: number[], n: number): void {
        const writeAt = (k: number, value: number): void => {
            if (k < 0 || k >= nums1.length) {
                throw new Error("list assignment index out of range");
            }
            nums1[k] = value;
        };
        let k = m + n - 1;
        let i = m - 1;
        let j = n - 1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                writeAt(k, nums1[i]);
                i--;
            } else {
                writeAt(k, nums2[j]);
                j--;
            }
            k--;
        }
    }
}
