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
    def mostSimilar(
        self, n: int, roads: List[List[int]], names: List[str], targetPath: List[str]
    ) -> List[int]:
        g = [[] for _ in range(n)]
        for a, b in roads:
            g[a].append(b)
            g[b].append(a)
        m = len(targetPath)
        f = [[inf] * n for _ in range(m)]
        pre = [[-1] * n for _ in range(m)]
        for j, s in enumerate(names):
            f[0][j] = targetPath[0] != s
        for i in range(1, m):
            for j in range(n):
                for k in g[j]:
                    if (t := f[i - 1][k] + (targetPath[i] != names[j])) < f[i][j]:
                        f[i][j] = t
                        pre[i][j] = k
        k = 0
        mi = inf
        for j in range(n):
            if f[-1][j] < mi:
                mi = f[-1][j]
                k = j
        ans = [0] * m
        for i in range(m - 1, -1, -1):
            ans[i] = k
            k = pre[i][k]
        return ans
