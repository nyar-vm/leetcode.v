export class Solution {
    reverseVowels(s: string): string {
        const vowels = new Set("aeiouAEIOU");
        const cs = [...s];
        let i = 0;
        let j = cs.length - 1;
        while (i < j) {
            while (i < j && !vowels.has(cs[i])) {
                i++;
            }
            while (i < j && !vowels.has(cs[j])) {
                j--;
            }
            if (i < j) {
                const tmp = cs[i];
                cs[i] = cs[j];
                cs[j] = tmp;
                i++;
                j--;
            }
        }
        return cs.join("");
    }
}
