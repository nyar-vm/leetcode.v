export class Solution {
    findContentChildren(g: number[], s: number[]): number {
        g.sort((a, b) => a - b);
        s.sort((a, b) => a - b);
        let j = 0;
        for (let i = 0; i < g.length; i++) {
            while (j < s.length && s[j] < g[i]) {
                j++;
            }
            if (j >= s.length) {
                return i;
            }
            j++;
        }
        return g.length;
    }
}
