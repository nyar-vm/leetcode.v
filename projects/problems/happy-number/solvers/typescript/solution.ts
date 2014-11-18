export class Solution {
    isHappy(n: number): boolean {
        const seen = new Set<number>();
        while (n !== 1) {
            if (seen.has(n)) {
                return false;
            }
            seen.add(n);
            let sum = 0;
            while (n > 0) {
                const d = n % 10;
                sum += d * d;
                n = Math.floor(n / 10);
            }
            n = sum;
        }
        return true;
    }
}
