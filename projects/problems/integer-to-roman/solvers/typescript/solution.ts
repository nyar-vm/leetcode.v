export class Solution {
    intToRoman(num: number): string {
        const cs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        const vs = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const ans: string[] = [];
        for (let idx = 0; idx < cs.length; idx++) {
            const c = cs[idx];
            const v = vs[idx];
            while (num >= v) {
                num -= v;
                ans.push(c);
            }
        }
        return ans.join("");
    }
}
