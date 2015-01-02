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
    removeNthFromEnd(head: number[] | ListNode | null, n: number): number[] | null {
        const root = Array.isArray(head) ? buildList(head) : head;
        const dummy = new ListNode(0, root);
        let fast: ListNode | null = dummy;
        let slow: ListNode | null = dummy;
        for (let i = 0; i < n; i++) {
            if (!fast) {
                throw new Error("'NoneType' object has no attribute 'next'");
            }
            fast = fast.next;
        }
        if (!fast) {
            throw new Error("'NoneType' object has no attribute 'next'");
        }
        while (fast.next) {
            slow = slow!.next;
            fast = fast.next;
        }
        slow!.next = slow!.next!.next;
        const out = listToArray(dummy.next);
        return out.length === 0 ? null : out;
    }
}
