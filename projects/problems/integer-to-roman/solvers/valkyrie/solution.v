namespace leetcode.integer_to_roman;

# 阻塞：SMIR010 — `Utf8Builder` / `ArrayList::new` wasm layout 合同失败（见 `valkyrie-evolution` backlog V-017c）

micro append_token(mut builder: Utf8Builder, token: i64): unit {
    if token == 1000 {
        builder.append(char::from(77))
    } else if token == 900 {
        builder.append(char::from(67))
        builder.append(char::from(77))
    } else if token == 500 {
        builder.append(char::from(68))
    } else if token == 400 {
        builder.append(char::from(67))
        builder.append(char::from(68))
    } else if token == 100 {
        builder.append(char::from(67))
    } else if token == 90 {
        builder.append(char::from(88))
        builder.append(char::from(67))
    } else if token == 50 {
        builder.append(char::from(76))
    } else if token == 40 {
        builder.append(char::from(88))
        builder.append(char::from(76))
    } else if token == 10 {
        builder.append(char::from(88))
    } else if token == 9 {
        builder.append(char::from(73))
        builder.append(char::from(88))
    } else if token == 5 {
        builder.append(char::from(86))
    } else if token == 4 {
        builder.append(char::from(73))
        builder.append(char::from(86))
    } else {
        builder.append(char::from(73))
    }
}

[export(case: "camelCase")]
micro int_to_roman(num: i64) -> utf8 {
    let values: [i64] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    let mut n: i64 = num
    let mut builder: Utf8Builder = Utf8Builder::new(15)
    let mut vi: usize = 0
    while vi < 13 {
        let v: i64 = values⁅vi⁆
        while n >= v {
            append_token(builder, v)
            n = n - v
        }
        vi = vi + 1
    }
    let result: utf8 = builder.build()
    return result
}

class Solution {
    micro intToRoman(self, num: i64): utf8 {
        return int_to_roman(num)
    }
}
