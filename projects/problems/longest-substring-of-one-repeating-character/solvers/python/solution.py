import random
import functools
import collections
import string
import math
import datetime

from typing import *
from functools import *
from collections import *
from itertools import *
from heapq import *
from bisect import *
from string import *
from operator import *
from math import *

inf = float('inf')

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

def is_same_list(p1, p2):
    if p1 is None and p2 is None:
        return True
    if not p1 or not p2:
        return False
    return p1.val == p2.val and is_same_list(p1.next, p2.next)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def tree_node(values: list):
    if not values:
        return None
    root = TreeNode(values[0])
    i = 1
    queue = deque()
    queue.append(root)
    while queue:
        node = queue.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root

def is_same_tree(p, q):
    if not p and not q:
        return True
    elif not p or not q:
        return False
    elif p.val != q.val:
        return False
    else:
        return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)

def max(a: int, b: int) -> int:
    return a if a > b else b


class Node:
    __slots__ = "l", "r", "lmx", "rmx", "mx"

    def __init__(self, l: int, r: int):
        self.l = l
        self.r = r
        self.lmx = self.rmx = self.mx = 1


class SegmentTree:
    __slots__ = "s", "tr"

    def __init__(self, s: str):
        self.s = list(s)
        n = len(s)
        self.tr: List[Node | None] = [None] * (n * 4)
        self.build(1, 1, n)

    def build(self, u: int, l: int, r: int):
        self.tr[u] = Node(l, r)
        if l == r:
            return
        mid = (l + r) // 2
        self.build(u << 1, l, mid)
        self.build(u << 1 | 1, mid + 1, r)
        self.pushup(u)

    def query(self, u: int, l: int, r: int) -> int:
        if self.tr[u].l >= l and self.tr[u].r <= r:
            return self.tr[u].mx
        mid = (self.tr[u].l + self.tr[u].r) // 2
        ans = 0
        if r <= mid:
            ans = self.query(u << 1, l, r)
        if l > mid:
            ans = max(ans, self.query(u << 1 | 1, l, r))
        return ans

    def modify(self, u: int, x: int, v: str):
        if self.tr[u].l == self.tr[u].r:
            self.s[x - 1] = v
            return
        mid = (self.tr[u].l + self.tr[u].r) // 2
        if x <= mid:
            self.modify(u << 1, x, v)
        else:
            self.modify(u << 1 | 1, x, v)
        self.pushup(u)

    def pushup(self, u: int):
        root, left, right = self.tr[u], self.tr[u << 1], self.tr[u << 1 | 1]
        root.lmx = left.lmx
        root.rmx = right.rmx
        root.mx = max(left.mx, right.mx)
        a, b = left.r - left.l + 1, right.r - right.l + 1
        if self.s[left.r - 1] == self.s[right.l - 1]:
            if left.lmx == a:
                root.lmx += right.lmx
            if right.rmx == b:
                root.rmx += left.rmx
            root.mx = max(root.mx, left.rmx + right.lmx)


class Solution:
    def longestRepeating(
        self, s: str, queryCharacters: str, queryIndices: List[int]
    ) -> List[int]:
        tree = SegmentTree(s)
        ans = []
        for x, v in zip(queryIndices, queryCharacters):
            tree.modify(1, x + 1, v)
            ans.append(tree.query(1, 1, len(s)))
        return ans
