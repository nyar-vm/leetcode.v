export class Solution {
    romanToInt(s: string): number {
        const d: Record<string, number> = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        };
        let sum = d[s[s.length - 1]];
        for (let i = 0; i < s.length - 1; i++) {
            const a = d[s[i]];
            const b = d[s[i + 1]];
            sum += (a < b ? -1 : 1) * a;
        }
        return sum;
    }
}
