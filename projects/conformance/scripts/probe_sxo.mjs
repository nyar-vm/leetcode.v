import { Mathematica } from "@sxo/mathematica";
import { Matlab } from "@sxo/matlab";

const m = Mathematica.create({ autoSimplify: false });
const ml = Matlab.create({ autoSimplify: false });

function wlHarness(source, symbol, args) {
    const argList = args.map((v) => JSON.stringify(v).replace(/"/g, '"')).join(", ");
    // reuse jsonToWolfram logic inline for numbers/arrays
    const fmt = (value) => {
        if (Array.isArray(value)) return `{${value.map(fmt).join(", ")}}`;
        if (typeof value === "string") return `"${value}"`;
        return String(value);
    };
    const argStr = args.map(fmt).join(", ");
    return `${source.trim()}\n\n${symbol}[${argStr}]`;
}

const wlPrograms = [
    [
        "palindrome",
        `isPalindrome[x_] := Module[{s = IntegerString[Abs[x]], rev = StringReverse[s]}, x >= 0 && s = rev]`,
        "isPalindrome",
        [121],
        "True",
    ],
    [
        "reverse",
        `reverseInteger[x_] := Module[{sign = Sign[x], n = Abs[x], rev = 0}, While[n > 0, rev = rev*10 + Mod[n, 10]; n = Quotient[n, 10]]; sign*rev]`,
        "reverseInteger",
        [123],
        "321",
    ],
    [
        "twoSum",
        `twoSum[nums_, target_] := Module[{n = Length[nums]},
  Do[
    Do[
      If[nums[[i]] + nums[[j]] == target, Return[{i - 1, j - 1}]],
      {j, i + 1, n}
    ],
    {i, 1, n - 1}
  ];
  Null]`,
        "twoSum",
        [[3, 3], 6],
        "{0, 1}",
    ],
    ["climb", `climbStairs[n_] := If[n <= 2, n, climbStairs[n - 1] + climbStairs[n - 2]]`, "climbStairs", [5], "8"],
];

const wlSyntax = [
    ["inline", "Module[{x=121}, x>=0 && IntegerString[x]==StringReverse[IntegerString[x]]]"],
    ["set block", "(isPalindrome[x_] := (x>=0 && IntegerString[x]==StringReverse[IntegerString[x]]); isPalindrome[121])"],
    ["set delayed block", "Block[{isPalindrome}, isPalindrome[x_] := x>=0; isPalindrome[121]]"],
    ["pure expr", "Sign[123]*Module[{n=123,rev=0}, While[n>0,rev=rev*10+Mod[n,10];n=Quotient[n,10]];rev]"],
];

for (const [label, program] of wlSyntax) {
    try {
        const out = m.evaluate(program).toWolfram();
        console.log(`WL syntax ${label}:`, out);
    } catch (err) {
        console.log(`WL syntax ${label} FAIL:`, String(err).slice(0, 160));
    }
}

for (const [label, source, sym, args, expect] of wlPrograms) {
    const program = wlHarness(source, sym, args);
    try {
        const out = m.evaluate(program).toWolfram();
        const ok = out === expect ? "OK" : `MISMATCH want ${expect}`;
        console.log(`WL ${label}:`, out, ok);
    } catch (err) {
        console.log(`WL ${label} FAIL:`, String(err).slice(0, 200));
    }
}

function mlHarness(source, symbol, args) {
    const fmt = (value) => {
        if (Array.isArray(value)) return `[${value.map(fmt).join(", ")}]`;
        if (typeof value === "string") return `'${value}'`;
        return String(value);
    };
    const argStr = args.map(fmt).join(", ");
    return `${source.trim()}\n\n${symbol}(${argStr})`;
}

const mlPrograms = [
    [
        "palindrome",
        `function y = isPalindrome(x)
s = int2str(abs(x));
y = strcmp(s, s(end:-1:1)) == 1;
end`,
        "isPalindrome",
        [121],
        "true",
    ],
    [
        "twoSum",
        `function out = twoSum(nums, target)
n = length(nums);
out = [0, 0];
for i = 1:(n-1)
  for j = (i+1):n
    if nums(i) + nums(j) == target
      out = [i-1, j-1];
      return;
    end
  end
end`,
        "twoSum",
        [[3, 3], 6],
        "[0, 1]",
    ],
];

for (const [label, source, sym, args, expect] of mlPrograms) {
    const program = mlHarness(source, sym, args);
    try {
        const out = ml.evaluate(program).toMatlab();
        const ok = out.trim() === expect ? "OK" : `MISMATCH want ${expect}`;
        console.log(`ML ${label}:`, out.trim(), ok);
    } catch (err) {
        console.log(`ML ${label} FAIL:`, String(err).slice(0, 200));
    }
}
