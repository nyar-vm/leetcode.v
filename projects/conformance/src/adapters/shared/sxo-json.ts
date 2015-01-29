/** JSON ↔ Wolfram / MATLAB 字面量（harness 边界，非完整方言解析器）。 */

export function jsonToWolfram(value: unknown): string {
    if (value === null) {
        return "Null";
    }
    if (typeof value === "boolean") {
        return value ? "True" : "False";
    }
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            throw new Error(`不支持的数字：${String(value)}`);
        }
        return String(value);
    }
    if (typeof value === "string") {
        return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    if (Array.isArray(value)) {
        return `{${value.map((item) => jsonToWolfram(item)).join(", ")}}`;
    }
    throw new Error(`无法序列化为 Wolfram：${typeof value}`);
}

export function jsonToMatlab(value: unknown): string {
    if (value === null) {
        return "[]";
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            throw new Error(`不支持的数字：${String(value)}`);
        }
        return String(value);
    }
    if (typeof value === "string") {
        return `'${value.replace(/'/g, "''")}'`;
    }
    if (Array.isArray(value)) {
        return `[${value.map((item) => jsonToMatlab(item)).join(", ")}]`;
    }
    throw new Error(`无法序列化为 MATLAB：${typeof value}`);
}

function stripOuterWhitespace(text: string): string {
    return text.trim();
}

/** 将 evaluate 渲染串解析回 JSON 可比对值（LeetCode 标量 / 一维数组）。 */
export function parseWolframSurface(text: string): unknown {
    const trimmed = stripOuterWhitespace(text);
    if (trimmed === "Null") {
        return null;
    }
    if (trimmed === "True") {
        return true;
    }
    if (trimmed === "False") {
        return false;
    }
    if (/^-?\d+$/.test(trimmed)) {
        return Number(trimmed);
    }
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        const inner = trimmed.slice(1, -1).trim();
        if (!inner) {
            return [];
        }
        return splitTopLevel(inner, ",").map((part) => parseWolframSurface(part));
    }
    throw new Error(`无法解析 Wolfram 结果：${trimmed}`);
}

/** 将 evaluate 渲染串解析回 JSON 可比对值。 */
export function parseMatlabSurface(text: string): unknown {
    const trimmed = stripOuterWhitespace(text);
    if (trimmed === "[]") {
        return null;
    }
    if (trimmed === "true") {
        return true;
    }
    if (trimmed === "false") {
        return false;
    }
    if (/^-?\d+$/.test(trimmed)) {
        return Number(trimmed);
    }
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
        return trimmed.slice(1, -1).replace(/''/g, "'");
    }
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        const inner = trimmed.slice(1, -1).trim();
        if (!inner) {
            return [];
        }
        return splitTopLevel(inner, ",").map((part) => parseMatlabSurface(part));
    }
    throw new Error(`无法解析 MATLAB 结果：${trimmed}`);
}

function splitTopLevel(text: string, separator: string): string[] {
    const parts: string[] = [];
    let depthBrace = 0;
    let depthBracket = 0;
    let inString = false;
    let escape = false;
    let quote = "";
    let current = "";

    for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (inString) {
            current += ch;
            if (escape) {
                escape = false;
                continue;
            }
            if (ch === "\\") {
                escape = true;
                continue;
            }
            if (ch === quote) {
                inString = false;
            }
            continue;
        }

        if (ch === '"' || ch === "'") {
            inString = true;
            quote = ch;
            current += ch;
            continue;
        }

        if (ch === "{") {
            depthBrace += 1;
        } else if (ch === "}") {
            depthBrace -= 1;
        } else if (ch === "[") {
            depthBracket += 1;
        } else if (ch === "]") {
            depthBracket -= 1;
        }

        if (ch === separator && depthBrace === 0 && depthBracket === 0) {
            parts.push(current.trim());
            current = "";
            continue;
        }

        current += ch;
    }

    if (current.trim()) {
        parts.push(current.trim());
    }

    return parts;
}
