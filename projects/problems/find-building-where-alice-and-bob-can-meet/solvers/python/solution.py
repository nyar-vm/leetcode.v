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

class BinaryIndexedTree:
    __slots__ = ["n", "c"]

    def __init__(self, n: int):
        self.n = n
        self.c = [inf] * (n + 1)

    def update(self, x: int, v: int):
        while x <= self.n:
            self.c[x] = min(self.c[x], v)
            x += x & -x

    def query(self, x: int) -> int:
        mi = inf
        while x:
            mi = min(mi, self.c[x])
            x -= x & -x
        return -1 if mi == inf else mi


class Solution:
    def leftmostBuildingQueries(
        self, heights: List[int], queries: List[List[int]]
    ) -> List[int]:
        n, m = len(heights), len(queries)
        for i in range(m):
            queries[i] = [min(queries[i]), max(queries[i])]
        j = n - 1
        s = sorted(set(heights))
        ans = [-1] * m
        tree = BinaryIndexedTree(n)
        for i in sorted(range(m), key=lambda i: -queries[i][1]):
            l, r = queries[i]
            while j > r:
                k = n - bisect_left(s, heights[j]) + 1
                tree.update(k, j)
                j -= 1
            if l == r or heights[l] < heights[r]:
                ans[i] = r
            else:
                k = n - bisect_left(s, heights[l])
                ans[i] = tree.query(k)
        return ans
