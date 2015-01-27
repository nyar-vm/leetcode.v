threeSum[nums_] := Module[{a = Sort[nums], n = Length[a], ans = {}, i = 1},
  While[i <= n - 2,
    If[a[[i]] > 0, Break[]];
    If[i > 1 && a[[i]] == a[[i - 1]], i = i + 1, (
      j = i + 1; k = n;
      While[j < k,
        x = a[[i]] + a[[j]] + a[[k]];
        Which[
          x < 0, j = j + 1,
          x > 0, k = k - 1,
          True, (AppendTo[ans, {a[[i]], a[[j]], a[[k]]}]; j = j + 1; k = k - 1;
            While[j < k && a[[j]] == a[[j - 1]], j = j + 1];
            While[j < k && a[[k]] == a[[k + 1]], k = k - 1])
        ]
      ];
      i = i + 1
    )]
  ];
  ans
]
