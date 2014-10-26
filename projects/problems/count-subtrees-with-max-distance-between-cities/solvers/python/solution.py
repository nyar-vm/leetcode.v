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

class Solution:
    def countSubgraphsForEachDiameter(
        self, n: int, edges: List[List[int]]
    ) -> List[int]:
        def dfs(u: int, d: int = 0):
            nonlocal mx, nxt, msk
            if mx < d:
                mx, nxt = d, u
            msk ^= 1 << u
            for v in g[u]:
                if msk >> v & 1:
                    dfs(v, d + 1)

        g = defaultdict(list)
        for u, v in edges:
            u, v = u - 1, v - 1
            g[u].append(v)
            g[v].append(u)
        ans = [0] * (n - 1)
        nxt = mx = 0
        for mask in range(1, 1 << n):
            if mask & (mask - 1) == 0:
                continue
            msk, mx = mask, 0
            cur = msk.bit_length() - 1
            dfs(cur)
            if msk == 0:
                msk, mx = mask, 0
                dfs(nxt)
                ans[mx - 1] += 1
        return ans
