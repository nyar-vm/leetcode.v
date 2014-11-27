export class Solution {
    isPalindrome(s: string): boolean {
        let i = 0;
        let j = s.length - 1;
        while (i < j) {
            while (i < j && !this.isAlnum(s[i])) {
                i++;
            }
            while (i < j && !this.isAlnum(s[j])) {
                j--;
            }
            if (this.key(s[i]) !== this.key(s[j])) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }

    private isAlnum(ch: string): boolean {
        const c = ch.charCodeAt(0);
        return (
            (c >= 48 && c <= 57) ||
            (c >= 65 && c <= 90) ||
            (c >= 97 && c <= 122)
        );
    }

    private key(ch: string): number {
        const c = ch.charCodeAt(0);
        if (c >= 65 && c <= 90) {
            return c + 32;
        }
        return c;
    }
}
