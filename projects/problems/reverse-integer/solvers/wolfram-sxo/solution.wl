reverse[x_] := Module[{mi = -2147483648, mx = 2147483647, n = x, ans = 0},
  While[n != 0,
    If[ans < Quotient[mi - 9, 10] + 1 || ans > Quotient[mx, 10], Return[0]];
    ans = ans * 10 + Mod[n, 10];
    n = Quotient[n - Mod[n, 10], 10]
  ];
  ans
]
