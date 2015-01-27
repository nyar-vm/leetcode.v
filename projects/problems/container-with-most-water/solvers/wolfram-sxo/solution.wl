maxArea[height_] := Module[{l = 1, r = Length[height], ans = 0},
  While[l < r,
    ans = Max[ans, Min[height[[l]], height[[r]]] * (r - l)];
    If[height[[l]] < height[[r]], l = l + 1, r = r - 1]
  ];
  ans
]
