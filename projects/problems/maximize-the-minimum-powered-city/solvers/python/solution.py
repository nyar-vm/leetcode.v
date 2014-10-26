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
    def maxPower(self, stations: List[int], r: int, k: int) -> int:
        def check(x, k):
            d = [0] * (n + 1)
            t = 0
            for i in range(n):
                t += d[i]
                dist = x - (s[i] + t)
                if dist > 0:
                    if k < dist:
                        return False
                    k -= dist
                    j = min(i + r, n - 1)
                    left, right = max(0, j - r), min(j + r, n - 1)
                    d[left] += dist
                    d[right + 1] -= dist
                    t += dist
            return True

        n = len(stations)
        d = [0] * (n + 1)
        for i, v in enumerate(stations):
            left, right = max(0, i - r), min(i + r, n - 1)
            d[left] += v
            d[right + 1] -= v
        s = list(accumulate(d))
        left, right = 0, 1 << 40
        while left < right:
            mid = (left + right + 1) >> 1
            if check(mid, k):
                left = mid
            else:
                right = mid - 1
        return left
