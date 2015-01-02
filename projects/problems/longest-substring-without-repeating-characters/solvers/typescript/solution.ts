export class Solution {
    lengthOfLongestSubstring(s: string): number {
        const ss = new Set<string>();
        let ans = 0;
        let i = 0;
        for (let j = 0; j < s.length; j++) {
            const c = s[j];
            while (ss.has(c)) {
                ss.delete(s[i]);
                i += 1;
            }
            ss.add(c);
            ans = Math.max(ans, j - i + 1);
        }
        return ans;
    }
}
