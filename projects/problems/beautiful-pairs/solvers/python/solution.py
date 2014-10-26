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
    def beautifulPair(self, nums1: List[int], nums2: List[int]) -> List[int]:
        def dist(x1: int, y1: int, x2: int, y2: int) -> int:
            return abs(x1 - x2) + abs(y1 - y2)

        def dfs(l: int, r: int):
            if l >= r:
                return inf, -1, -1
            m = (l + r) >> 1
            x = points[m][0]
            d1, pi1, pj1 = dfs(l, m)
            d2, pi2, pj2 = dfs(m + 1, r)
            if d1 > d2 or (d1 == d2 and (pi1 > pi2 or (pi1 == pi2 and pj1 > pj2))):
                d1, pi1, pj1 = d2, pi2, pj2
            t = [p for p in points[l : r + 1] if abs(p[0] - x) <= d1]
            t.sort(key=lambda x: x[1])
            for i in range(len(t)):
                for j in range(i + 1, len(t)):
                    if t[j][1] - t[i][1] > d1:
                        break
                    pi, pj = sorted([t[i][2], t[j][2]])
                    d = dist(t[i][0], t[i][1], t[j][0], t[j][1])
                    if d < d1 or (d == d1 and (pi < pi1 or (pi == pi1 and pj < pj1))):
                        d1, pi1, pj1 = d, pi, pj
            return d1, pi1, pj1

        pl = defaultdict(list)
        for i, (x, y) in enumerate(zip(nums1, nums2)):
            pl[(x, y)].append(i)
        points = []
        for i, (x, y) in enumerate(zip(nums1, nums2)):
            if len(pl[(x, y)]) > 1:
                return [i, pl[(x, y)][1]]
            points.append((x, y, i))
        points.sort()
        _, pi, pj = dfs(0, len(points) - 1)
        return [pi, pj]
