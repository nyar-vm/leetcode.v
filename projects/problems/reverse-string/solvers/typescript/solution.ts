export class Solution {
    reverseString(s: string[]): void {
        let i = 0;
        let j = s.length - 1;
        while (i < j) {
            const tmp = s[i];
            s[i] = s[j];
            s[j] = tmp;
            i++;
            j--;
        }
    }
}
