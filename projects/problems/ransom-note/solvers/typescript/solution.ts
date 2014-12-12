export class Solution {
    canConstruct(ransomNote: string, magazine: string): boolean {
        const counts = new Array<number>(26).fill(0);
        for (let j = 0; j < magazine.length; j += 1) {
            counts[magazine.charCodeAt(j) - 97] += 1;
        }
        for (let i = 0; i < ransomNote.length; i += 1) {
            const index = ransomNote.charCodeAt(i) - 97;
            counts[index] -= 1;
            if (counts[index] < 0) {
                return false;
            }
        }
        return true;
    }
}
