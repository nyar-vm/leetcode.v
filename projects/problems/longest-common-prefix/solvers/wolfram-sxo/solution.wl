longestCommonPrefix[strs_] := Module[{first = strs[[1]], i = 1, n = Length[first]},
  While[i <= n,
    Do[
      If[i > StringLength[strs[[j]]] || StringTake[first, {i}] != StringTake[strs[[j]], {i}], Return[StringTake[first, {i - 1}]]],
      {j, 2, Length[strs]}
    ];
    i = i + 1
  ];
  first
]
