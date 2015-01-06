from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        table = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        ans: List[str] = []
        path: List[str] = []

        def dfs(index: int) -> None:
            if index == len(digits):
                ans.append("".join(path))
                return
            for ch in table[int(digits[index]) - 2]:
                path.append(ch)
                dfs(index + 1)
                path.pop()

        dfs(0)
        return ans
