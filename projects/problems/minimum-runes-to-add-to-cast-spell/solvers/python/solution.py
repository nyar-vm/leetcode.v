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
    def minRunesToAdd(
        self, n: int, crystals: List[int], flowFrom: List[int], flowTo: List[int]
    ) -> int:
        def bfs(q: Deque[int]):
            while q:
                a = q.popleft()
                for b in g[a]:
                    if vis[b] == 1:
                        continue
                    vis[b] = 1
                    q.append(b)

        def dfs(a: int):
            vis[a] = 2
            for b in g[a]:
                if vis[b] > 0:
                    continue
                dfs(b)
            seq.append(a)

        g = [[] for _ in range(n)]
        for a, b in zip(flowFrom, flowTo):
            g[a].append(b)

        q = deque(crystals)
        vis = [0] * n
        for x in crystals:
            vis[x] = 1
        bfs(q)

        seq = []
        for i in range(n):
            if vis[i] == 0:
                dfs(i)
        seq.reverse()
        ans = 0
        for i in seq:
            if vis[i] == 2:
                q = deque([i])
                vis[i] = 1
                bfs(q)
                ans += 1
        return ans
