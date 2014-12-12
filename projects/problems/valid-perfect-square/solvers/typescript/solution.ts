export class Solution {
    isPerfectSquare(num: number): boolean {
        if (num < 2) {
            return true;
        }
        let lo = 2;
        let hi = num;
        while (lo <= hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            const sq = mid * mid;
            if (sq === num) {
                return true;
            }
            if (sq < num) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return false;
    }
}
