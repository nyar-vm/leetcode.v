export class Solution {
    isAnagram(s: string, t: string): boolean {
        if (s.length !== t.length) {
            return false;
        }
        const cnt = new Array<number>(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            cnt[s.charCodeAt(i) - 97]++;
            cnt[t.charCodeAt(i) - 97]--;
        }
        for (const c of cnt) {
            if (c !== 0) {
                return false;
            }
        }
        return true;
    }
}
