export class Solution {
    letterCombinations(digits: string): string[] {
        if (!digits) {
            return [];
        }
        const table = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
        const ans: string[] = [];
        const path: string[] = [];
        const dfs = (index: number): void => {
            if (index === digits.length) {
                ans.push(path.join(""));
                return;
            }
            for (const ch of table[Number(digits[index]) - 2]) {
                path.push(ch);
                dfs(index + 1);
                path.pop();
            }
        };
        dfs(0);
        return ans;
    }
}
