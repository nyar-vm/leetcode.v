export class Solution {
    convert(s: string, numRows: number): string {
        if (numRows === 1) {
            return s;
        }
        const g: string[][] = Array.from({ length: numRows }, () => []);
        let i = 0;
        let k = -1;
        for (const c of s) {
            g[i].push(c);
            if (i === 0 || i === numRows - 1) {
                k = -k;
            }
            i += k;
        }
        return g.map((row) => row.join("")).join("");
    }
}
