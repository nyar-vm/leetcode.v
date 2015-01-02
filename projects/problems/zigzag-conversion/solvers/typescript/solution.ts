function asMetadataValue(value: string): string | number {
    if (/^\d+$/.test(value) && !value.startsWith("0")) {
        return Number(value);
    }
    return value;
}

export class Solution {
    convert(s: string, numRows: number): string | number {
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
        return asMetadataValue(g.map((row) => row.join("")).join(""));
    }
}
