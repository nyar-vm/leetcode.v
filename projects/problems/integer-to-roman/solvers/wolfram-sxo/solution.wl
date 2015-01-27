intToRoman[num_] := Module[{n = num, vals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}, syms = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}, out = ""},
  Do[
    While[n >= vals[[k]],
      out = out <> syms[[k]];
      n = n - vals[[k]]
    ],
    {k, 1, Length[vals]}
  ];
  out
]
