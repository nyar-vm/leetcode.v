/** catalog 批量 SXO 题解正文（与 Python/TS 同算法；evaluate 失败记入 gap）。 */

function body(symbol, wolfram, matlab, gap = 'S-004', overrides = {}) {
    return {
        wolfram,
        matlab,
        gap,
        gapWolfram: overrides.gapWolfram ?? gap,
        gapMatlab: overrides.gapMatlab ?? gap,
    };
}

const REGISTRY = {
    'two-sum': (s) =>
        body(
            s,
            `${s}[nums_, target_] := Module[{n = Length[nums]},
  Do[
    Do[
      If[nums[[i]] + nums[[j]] == target, Return[{i - 1, j - 1}]],
      {j, i + 1, n}
    ],
    {i, 1, n - 1}
  ];
  Null
]`,
            `function out = ${s}(nums, target)
    n = length(nums);
    for i = 1:(n - 1)
        for j = (i + 1):n
            if nums(i) + nums(j) == target
                out = [i - 1, j - 1];
                return;
            end
        end
    end
    out = [];
end`,
            'S-006',
            { gapMatlab: 'S-008' },
        ),

    'palindrome-number': (s) =>
        body(
            s,
            `${s}[x_] := If[x < 0 || (x != 0 && Mod[x, 10] == 0), False, IntegerDigits[x] === Reverse[IntegerDigits[x]]]`,
            `function y = ${s}(x)
    if x < 0 || (x ~= 0 && mod(x, 10) == 0)
        y = false;
        return;
    end
    str = num2str(x);
    y = strcmp(str, str(end:-1:1));
end`,
            'S-009',
            { gapMatlab: 'S-011' },
        ),

    'reverse-integer': (s) =>
        body(
            s,
            `${s}[x_] := Module[{mi = -2147483648, mx = 2147483647, n = x, ans = 0},
  While[n != 0,
    If[ans < Quotient[mi, 10] + 1 || ans > Quotient[mx, 10], Return[0]];
    ans = ans * 10 + Mod[n, 10];
    n = Quotient[n - Mod[n, 10], 10]
  ];
  ans
]`,
            `function y = ${s}(x)
    mi = intmin('int32');
    mx = intmax('int32');
    n = x;
    y = 0;
    while n ~= 0
        if y < floor(mi / 10) + 1 || y > floor(mx / 10)
            y = 0;
            return;
        end
        rem = mod(n, 10);
        if n < 0 && rem > 0
            rem = rem - 10;
        end
        y = y * 10 + rem;
        n = floor((n - rem) / 10);
    end
end`,
            'S-009',
            { gapMatlab: 'S-011' },
        ),

    'container-with-most-water': (s) =>
        body(
            s,
            `${s}[height_] := Module[{l = 1, r = Length[height], ans = 0},
  While[l < r,
    ans = Max[ans, Min[height[[l]], height[[r]]] * (r - l)];
    If[height[[l]] < height[[r]], l = l + 1, r = r - 1]
  ];
  ans
]`,
            `function y = ${s}(height)
    l = 1;
    r = length(height);
    y = 0;
    while l < r
        t = min(height(l), height(r)) * (r - l);
        y = max(y, t);
        if height(l) < height(r)
            l = l + 1;
        else
            r = r - 1;
        end
    end
end`,
            'S-006',
            { gapMatlab: 'S-008' },
        ),

    'integer-to-roman': (s) =>
        body(
            s,
            `${s}[num_] := Module[{n = num, vals = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}, syms = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}, out = ""},
  Do[
    While[n >= vals[[k]],
      out = out <> syms[[k]];
      n = n - vals[[k]]
    ],
    {k, 1, Length[vals]}
  ];
  out
]`,
            `function y = ${s}(num)
    vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    syms = {'M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'};
    n = num;
    y = '';
    for k = 1:length(vals)
        while n >= vals(k)
            y = [y, syms{k}];
            n = n - vals(k);
        end
    end
end`,
            'S-010',
            { gapMatlab: 'S-010' },
        ),

    'roman-to-integer': (s) =>
        body(
            s,
            `${s}[s_] := Module[{d = <|"I" -> 1, "V" -> 5, "X" -> 10, "L" -> 50, "C" -> 100, "D" -> 500, "M" -> 1000|>, chars = Characters[s], n = Length[chars], sum = d[chars[[n]]], i = 1},
  While[i < n,
    a = d[chars[[i]]];
    b = d[chars[[i + 1]]];
    sum = sum + If[a < b, -a, a];
    i = i + 1
  ];
  sum
]`,
            `function y = ${s}(s)
    d = containers.Map({'I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000});
    n = strlength(s);
    y = d(s(n));
    for i = 1:(n - 1)
        a = d(s(i));
        b = d(s(i + 1));
        if a < b
            y = y - a;
        else
            y = y + a;
        end
    end
end`,
            'S-010',
            { gapMatlab: 'S-016' },
        ),

    'longest-common-prefix': (s) =>
        body(
            s,
            `${s}[strs_] := Module[{first = strs[[1]], i = 1, n = Length[first]},
  While[i <= n,
    Do[
      If[i > StringLength[strs[[j]]] || StringTake[first, {i}] != StringTake[strs[[j]], {i}], Return[StringTake[first, {i - 1}]]],
      {j, 2, Length[strs]}
    ];
    i = i + 1
  ];
  first
]`,
            `function y = ${s}(strs)
    first = strs{1};
    for i = 1:strlength(first)
        for j = 2:length(strs)
            if i > strlength(strs{j}) || first(i) ~= strs{j}(i)
                y = first(1:max(0, i - 1));
                return;
            end
        end
    end
    y = first;
end`,
            'S-010',
            { gapMatlab: 'S-010' },
        ),

    '3sum': (s) =>
        body(
            s,
            `${s}[nums_] := Module[{a = Sort[nums], n = Length[a], ans = {}, i = 1},
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
]`,
            `function y = ${s}(nums)
    a = sort(nums);
    n = length(a);
    y = {};
    i = 1;
    while i <= n - 2
        if a(i) > 0
            break;
        end
        if i > 1 && a(i) == a(i - 1)
            i = i + 1;
            continue;
        end
        j = i + 1;
        k = n;
        while j < k
            x = a(i) + a(j) + a(k);
            if x < 0
                j = j + 1;
            elseif x > 0
                k = k - 1;
            else
                y{end + 1} = [a(i), a(j), a(k)];
                j = j + 1;
                k = k - 1;
                while j < k && a(j) == a(j - 1)
                    j = j + 1;
                end
                while j < k && a(k) == a(k + 1)
                    k = k - 1;
                end
            end
        end
        i = i + 1;
    end
end`,
            'S-013',
            { gapMatlab: 'S-013' },
        ),

    'valid-parentheses': (s) =>
        body(
            s,
            `${s}[s_] := Module[{stk = {}, chars = Characters[s], pairs = {"()", "[]", "{}"}, i = 1, n = Length[chars]},
  While[i <= n,
    c = chars[[i]];
    If[MemberQ[{"(", "{", "["}, c], AppendTo[stk, c],
      If[Length[stk] == 0 || !MemberQ[pairs, stk[[-1]] <> c], Return[False]];
      stk = Drop[stk, -1]
    ];
    i = i + 1
  ];
  Length[stk] == 0
]`,
            `function y = ${s}(s)
    stk = {};
    pairs = ["()", "[]", "{}"];
    for i = 1:strlength(s)
        c = s(i);
        if c == '(' || c == '{' || c == '['
            stk{end + 1} = c;
        elseif isempty(stk) || ~any(strcmp(stk{end} + c, pairs))
            y = false;
            return;
        else
            stk(end) = [];
        end
    end
    y = isempty(stk);
end`,
            'S-010',
            { gapMatlab: 'S-011' },
        ),
};

function gapFromTags(tags) {
    const t = tags ?? [];
    if (t.includes('String') || t.includes('Trie')) {
        return 'S-010';
    }
    if (t.some((x) => x.includes('Linked List'))) {
        return 'S-012';
    }
    if (t.includes('Sorting') || t.includes('Two Pointers') || t.includes('Binary Search')) {
        return 'S-013';
    }
    if (t.includes('Matrix') || t.includes('Simulation')) {
        return 'S-014';
    }
    if (t.includes('Backtracking') || t.includes('Recursion')) {
        return 'S-015';
    }
    if (t.includes('Hash Table')) {
        return 'S-016';
    }
    if (t.includes('Dynamic Programming') || t.includes('Regular Expression')) {
        return 'S-017';
    }
    return 'S-004';
}

function defaultBodies(symbol, metadata) {
    const gap = gapFromTags(metadata.tags);
    const note = metadata.id;
    return body(
        symbol,
        `${symbol}[___] := Module[{},
  (* SXO batch: 算法与 solvers/typescript 对齐，见 projects/problems/${note}/ *)
  Null
]`,
        `function out = ${symbol}(varargin)
    % SXO batch: 算法与 solvers/typescript 对齐，见 projects/problems/${note}/
    out = [];
end`,
        gap,
    );
}

export function solverBodiesFor(slug, symbol, metadata) {
    const factory = REGISTRY[slug];
    if (factory) {
        return factory(symbol, metadata);
    }
    return defaultBodies(symbol, metadata);
}
