export class Solution {
    reverse(x: number): number {
        const mi = -(2 ** 31);
        const mx = 2 ** 31 - 1;
        let ans = 0;
        while (x !== 0) {
            if (ans < Math.floor(mi / 10) + 1 || ans > Math.floor(mx / 10)) {
                return 0;
            }
            let y = x % 10;
            if (x < 0 && y > 0) {
                y -= 10;
            }
            ans = ans * 10 + y;
            x = Math.trunc((x - y) / 10);
        }
        return ans;
    }
}
