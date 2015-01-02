export class Solution {
    isMatch(s: string, p: string): boolean {
        const m = s.length;
        const n = p.length;
        const memo = new Map<string, boolean>();

        const dfs = (i: number, j: number): boolean => {
            const key = `${i},${j}`;
            if (memo.has(key)) {
                return memo.get(key)!;
            }
            let result: boolean;
            if (j >= n) {
                result = i === m;
            } else if (j + 1 < n && p[j + 1] === "*") {
                result =
                    dfs(i, j + 2) ||
                    (i < m && (s[i] === p[j] || p[j] === ".") && dfs(i + 1, j));
            } else {
                result = i < m && (s[i] === p[j] || p[j] === ".") && dfs(i + 1, j + 1);
            }
            memo.set(key, result);
            return result;
        };

        return dfs(0, 0);
    }
}
