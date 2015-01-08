export class Solution {
    longestPalindrome(s: string): string {
        const n = s.length;
        const f: boolean[][] = Array.from({ length: n }, () => Array(n).fill(true));
        let k = 0;
        let mx = 1;
        for (let i = n - 2; i >= 0; i--) {
            for (let j = i + 1; j < n; j++) {
                f[i][j] = false;
                if (s[i] === s[j]) {
                    f[i][j] = f[i + 1][j - 1];
                    if (f[i][j] && mx < j - i + 1) {
                        k = i;
                        mx = j - i + 1;
                    }
                }
            }
        }
        return s.slice(k, k + mx);
    }
}
