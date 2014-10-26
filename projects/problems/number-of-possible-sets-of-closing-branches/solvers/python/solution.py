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
    def numberOfSets(self, n: int, maxDistance: int, roads: List[List[int]]) -> int:
        ans = 0
        for mask in range(1 << n):
            g = [[inf] * n for _ in range(n)]
            for u, v, w in roads:
                if mask >> u & 1 and mask >> v & 1:
                    g[u][v] = min(g[u][v], w)
                    g[v][u] = min(g[v][u], w)
            for k in range(n):
                if mask >> k & 1:
                    g[k][k] = 0
                    for i in range(n):
                        for j in range(n):
                            # g[i][j] = min(g[i][j], g[i][k] + g[k][j])
                            if g[i][k] + g[k][j] < g[i][j]:
                                g[i][j] = g[i][k] + g[k][j]
            if all(
                g[i][j] <= maxDistance
                for i in range(n)
                for j in range(n)
                if mask >> i & 1 and mask >> j & 1
            ):
                ans += 1
        return ans
