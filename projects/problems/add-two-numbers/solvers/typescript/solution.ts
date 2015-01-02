class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val = 0, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

function buildList(values: number[]): ListNode | null {
    if (values.length === 0) {
        return null;
    }
    const head = new ListNode(values[0]);
    let curr = head;
    for (let i = 1; i < values.length; i++) {
        curr.next = new ListNode(values[i]);
        curr = curr.next;
    }
    return head;
}

function listToArray(head: ListNode | null): number[] {
    const out: number[] = [];
    while (head) {
        out.push(head.val);
        head = head.next;
    }
    return out;
}

export class Solution {
    addTwoNumbers(l1: number[] | ListNode | null, l2: number[] | ListNode | null): number[] {
        const a = Array.isArray(l1) ? buildList(l1) : l1;
        const b = Array.isArray(l2) ? buildList(l2) : l2;
        const dummy = new ListNode();
        let carry = 0;
        let curr = dummy;
        let p1 = a;
        let p2 = b;
        while (p1 || p2 || carry) {
            const s = (p1?.val ?? 0) + (p2?.val ?? 0) + carry;
            carry = Math.floor(s / 10);
            curr.next = new ListNode(s % 10);
            curr = curr.next;
            p1 = p1?.next ?? null;
            p2 = p2?.next ?? null;
        }
        return listToArray(dummy.next);
    }
}
