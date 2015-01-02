export class Solution {
    longestCommonPrefix(strs: string[]): string {
        for (let i = 0; i < strs[0].length; i++) {
            for (let j = 1; j < strs.length; j++) {
                const s = strs[j];
                if (s.length <= i || s[i] !== strs[0][i]) {
                    return s.slice(0, i);
                }
            }
        }
        return strs[0];
    }
}
