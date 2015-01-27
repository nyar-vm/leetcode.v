romanToInt[s_] := Module[{d = <|"I" -> 1, "V" -> 5, "X" -> 10, "L" -> 50, "C" -> 100, "D" -> 500, "M" -> 1000|>, chars = Characters[s], n = Length[chars], sum = d[chars[[n]]], i = 1},
  While[i < n,
    a = d[chars[[i]]];
    b = d[chars[[i + 1]]];
    sum = sum + If[a < b, -a, a];
    i = i + 1
  ];
  sum
]
