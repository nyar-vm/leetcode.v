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
    def addTwoNumbers(self, l1, l2):
        if isinstance(l1, list):
            l1 = list_node(l1) if l1 else None
        if isinstance(l2, list):
            l2 = list_node(l2) if l2 else None
        dummy = ListNode()
        carry, curr = 0, dummy
        while l1 or l2 or carry:
            s = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
            carry, val = divmod(s, 10)
            curr.next = ListNode(val)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return list_to_array(dummy.next)
