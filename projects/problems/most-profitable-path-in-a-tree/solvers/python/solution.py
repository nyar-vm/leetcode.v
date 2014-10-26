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
    def mostProfitablePath(
        self, edges: List[List[int]], bob: int, amount: List[int]
    ) -> int:
        def dfs1(i, fa, t):
            if i == 0:
                ts[i] = min(ts[i], t)
                return True
            for j in g[i]:
                if j != fa and dfs1(j, i, t + 1):
                    ts[j] = min(ts[j], t + 1)
                    return True
            return False

        def dfs2(i, fa, t, v):
            if t == ts[i]:
                v += amount[i] // 2
            elif t < ts[i]:
                v += amount[i]
            nonlocal ans
            if len(g[i]) == 1 and g[i][0] == fa:
                ans = max(ans, v)
                return
            for j in g[i]:
                if j != fa:
                    dfs2(j, i, t + 1, v)

        n = len(edges) + 1
        g = defaultdict(list)
        ts = [n] * n
        for a, b in edges:
            g[a].append(b)
            g[b].append(a)
        dfs1(bob, -1, 0)
        ts[bob] = 0
        ans = -inf
        dfs2(0, -1, 0, 0)
        return ans
