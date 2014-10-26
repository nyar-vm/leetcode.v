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
    __slots__ = "l", "r", "s00", "s01", "s10", "s11"

    def __init__(self, l: int, r: int):
        self.l = l
        self.r = r
        self.s00 = self.s01 = self.s10 = self.s11 = 0


class SegmentTree:
    __slots__ = "tr"

    def __init__(self, n: int):
        self.tr: List[Node | None] = [None] * (n << 2)
        self.build(1, 1, n)

    def build(self, u: int, l: int, r: int):
        self.tr[u] = Node(l, r)
        if l == r:
            return
        mid = (l + r) >> 1
        self.build(u << 1, l, mid)
        self.build(u << 1 | 1, mid + 1, r)

    def query(self, u: int, l: int, r: int) -> int:
        if self.tr[u].l >= l and self.tr[u].r <= r:
            return self.tr[u].s11
        mid = (self.tr[u].l + self.tr[u].r) >> 1
        ans = 0
        if r <= mid:
            ans = self.query(u << 1, l, r)
        if l > mid:
            ans = max(ans, self.query(u << 1 | 1, l, r))
        return ans

    def pushup(self, u: int):
        left, right = self.tr[u << 1], self.tr[u << 1 | 1]
        self.tr[u].s00 = max(left.s00 + right.s10, left.s01 + right.s00)
        self.tr[u].s01 = max(left.s00 + right.s11, left.s01 + right.s01)
        self.tr[u].s10 = max(left.s10 + right.s10, left.s11 + right.s00)
        self.tr[u].s11 = max(left.s10 + right.s11, left.s11 + right.s01)

    def modify(self, u: int, x: int, v: int):
        if self.tr[u].l == self.tr[u].r:
            self.tr[u].s11 = max(0, v)
            return
        mid = (self.tr[u].l + self.tr[u].r) >> 1
        if x <= mid:
            self.modify(u << 1, x, v)
        else:
            self.modify(u << 1 | 1, x, v)
        self.pushup(u)


class Solution:
    def maximumSumSubsequence(self, nums: List[int], queries: List[List[int]]) -> int:
        n = len(nums)
        tree = SegmentTree(n)
        for i, x in enumerate(nums, 1):
            tree.modify(1, i, x)
        ans = 0
        mod = 10**9 + 7
        for i, x in queries:
            tree.modify(1, i + 1, x)
            ans = (ans + tree.query(1, 1, n)) % mod
        return ans
