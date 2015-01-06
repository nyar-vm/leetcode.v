from typing import List

class ListNode:
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


class Solution:
    def removeNthFromEnd(self, head, n: int):
        if isinstance(head, list):
            head = list_node(head) if head else None
        dummy = ListNode(next=head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            slow, fast = slow.next, fast.next
        slow.next = slow.next.next
        out = list_to_array(dummy.next)
        return out if out else None
