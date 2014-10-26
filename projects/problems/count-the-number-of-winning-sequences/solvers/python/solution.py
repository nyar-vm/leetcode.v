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
    def countWinningSequences(self, s: str) -> int:
        def calc(x: int, y: int) -> int:
            if x == y:
                return 0
            if x < y:
                return 1 if x == 0 and y == 2 else -1
            return -1 if x == 2 and y == 0 else 1

        @cache
        def dfs(i: int, j: int, k: int) -> int:
            if len(s) - i <= j:
                return 0
            if i >= len(s):
                return int(j < 0)
            res = 0
            for l in range(3):
                if l == k:
                    continue
                res = (res + dfs(i + 1, j + calc(d[s[i]], l), l)) % mod
            return res

        mod = 10**9 + 7
        d = {"F": 0, "W": 1, "E": 2}
        ans = dfs(0, 0, -1)
        dfs.cache_clear()
        return ans
