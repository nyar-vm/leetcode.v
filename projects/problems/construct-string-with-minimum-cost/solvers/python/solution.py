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
    def minimumCost(self, target: str, words: List[str], costs: List[int]) -> int:
        base, mod = 13331, 998244353
        n = len(target)
        h = [0] * (n + 1)
        p = [1] * (n + 1)
        for i, c in enumerate(target, 1):
            h[i] = (h[i - 1] * base + ord(c)) % mod
            p[i] = (p[i - 1] * base) % mod
        f = [0] + [inf] * n
        ss = sorted(set(map(len, words)))
        d = defaultdict(lambda: inf)
        min = lambda a, b: a if a < b else b
        for w, c in zip(words, costs):
            x = 0
            for ch in w:
                x = (x * base + ord(ch)) % mod
            d[x] = min(d[x], c)
        for i in range(1, n + 1):
            for j in ss:
                if j > i:
                    break
                x = (h[i] - h[i - j] * p[j]) % mod
                f[i] = min(f[i], f[i - j] + d[x])
        return f[n] if f[n] < inf else -1
