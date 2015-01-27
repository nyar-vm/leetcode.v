isValid[s_] := Module[{stk = {}, chars = Characters[s], pairs = {"()", "[]", "{}"}, i = 1, n = Length[chars]},
  While[i <= n,
    c = chars[[i]];
    If[MemberQ[{"(", "{", "["}, c], AppendTo[stk, c],
      If[Length[stk] == 0 || !MemberQ[pairs, stk[[-1]] <> c], Return[False]];
      stk = Drop[stk, -1]
    ];
    i = i + 1
  ];
  Length[stk] == 0
]
