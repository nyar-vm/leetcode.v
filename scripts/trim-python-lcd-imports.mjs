import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "projects", "problems");
const batch = [
    "two-sum",
    "add-two-numbers",
    "longest-substring-without-repeating-characters",
    "median-of-two-sorted-arrays",
    "longest-palindromic-substring",
    "zigzag-conversion",
    "reverse-integer",
    "string-to-integer-atoi",
    "palindrome-number",
    "regular-expression-matching",
    "container-with-most-water",
    "integer-to-roman",
    "roman-to-integer",
    "longest-common-prefix",
    "3sum",
    "3sum-closest",
    "letter-combinations-of-a-phone-number",
    "4sum",
    "remove-nth-node-from-end-of-list",
    "valid-parentheses",
];
const linked = new Set(["add-two-numbers", "remove-nth-node-from-end-of-list"]);

function detectImports(body) {
    const imports = [];
    if (/\bpairwise\b/.test(body)) {
        imports.push("from itertools import pairwise");
    }
    if (/\bchain\b/.test(body)) {
        imports.push("from itertools import chain");
    }
    if (/@cache\b/.test(body)) {
        imports.push("from functools import cache");
    }
    if (/\bList\b/.test(body)) {
        imports.push("from typing import List");
    }
    return imports;
}

const LIST_HELPERS = `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def list_node(values: list):
    if not values:
        return None
    head = ListNode(values[0])
    p = head
    for val in values[1:]:
        node = ListNode(val)
        p.next = node
        p = node
    return head

def list_to_array(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

`;

for (const id of batch) {
    const filePath = join(root, id, "solvers", "python", "solution.py");
    let body = readFileSync(filePath, "utf8");
    const idx = body.indexOf("class Solution:");
    if (idx < 0) {
        throw new Error(`missing class Solution in ${id}`);
    }
    body = body.slice(idx);
    const lines = [];
    const imports = detectImports(body);
    if (imports.length > 0) {
        lines.push(...imports, "");
    }
    if (/\binf\b/.test(body)) {
        lines.push("inf = float('inf')", "");
    }
    if (linked.has(id)) {
        lines.push(LIST_HELPERS);
    }
    lines.push(body.trimEnd(), "");
    writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`trimmed ${id} -> ${lines.join("\n").split("\n").length} lines`);
}
