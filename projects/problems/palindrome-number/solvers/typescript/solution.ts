export class Solution {
    isPalindrome(x: number): boolean {
        if (x < 0 || (x !== 0 && x % 10 === 0)) {
            return false;
        }
        let reversed = 0;
        while (reversed < x) {
            reversed = reversed * 10 + x % 10;
            x = Math.trunc(x / 10);
        }
        return x === reversed || x === Math.trunc(reversed / 10);
    }
}
