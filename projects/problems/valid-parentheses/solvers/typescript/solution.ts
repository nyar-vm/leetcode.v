export class Solution {
    isValid(s: string): boolean {
        const stk: string[] = [];
        const pairs = new Set(["()", "[]", "{}"]);
        for (const c of s) {
            if (c === "(" || c === "{" || c === "[") {
                stk.push(c);
            } else if (stk.length === 0 || !pairs.has(stk.pop()! + c)) {
                return false;
            }
        }
        return stk.length === 0;
    }
}
