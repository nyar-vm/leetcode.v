isPalindrome[x_] := If[x < 0 || (x != 0 && Mod[x, 10] == 0), False, IntegerDigits[x] === Reverse[IntegerDigits[x]]]
