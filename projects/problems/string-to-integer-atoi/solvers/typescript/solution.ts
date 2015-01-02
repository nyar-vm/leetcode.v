export class Solution {
    myAtoi(s: string): number {
        if (!s) {
            return 0;
        }
        const n = s.length;
        let i = 0;
        while (s[i] === " ") {
            i += 1;
            if (i === n) {
                return 0;
            }
        }
        const sign = s[i] === "-" ? -1 : 1;
        if (s[i] === "-" || s[i] === "+") {
            i += 1;
        }
        let res = 0;
        const flag = Math.floor((2 ** 31 - 1) / 10);
        while (i < n) {
            const ch = s[i];
            if (ch < "0" || ch > "9") {
                break;
            }
            const c = ch.charCodeAt(0) - 48;
            if (res > flag || (res === flag && c > 7)) {
                return sign > 0 ? 2 ** 31 - 1 : -(2 ** 31);
            }
            res = res * 10 + c;
            i += 1;
        }
        return sign * res;
    }
}
