export class Solution {
    canPlaceFlowers(flowerbed: number[], n: number): boolean {
        let remaining = n;
        for (let i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] !== 0) {
                continue;
            }
            const leftEmpty = i === 0 || flowerbed[i - 1] === 0;
            const rightEmpty = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
            if (leftEmpty && rightEmpty) {
                flowerbed[i] = 1;
                remaining--;
                if (remaining <= 0) {
                    return true;
                }
            }
        }
        return remaining <= 0;
    }
}
