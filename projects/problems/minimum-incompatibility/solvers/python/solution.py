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
    def minimumIncompatibility(self, nums: List[int], k: int) -> int:
        n = len(nums)
        m = n // k
        g = [-1] * (1 << n)
        for i in range(1, 1 << n):
            if i.bit_count() != m:
                continue
            s = set()
            mi, mx = 20, 0
            for j, x in enumerate(nums):
                if i >> j & 1:
                    if x in s:
                        break
                    s.add(x)
                    mi = min(mi, x)
                    mx = max(mx, x)
            if len(s) == m:
                g[i] = mx - mi
        f = [inf] * (1 << n)
        f[0] = 0
        for i in range(1 << n):
            if f[i] == inf:
                continue
            s = set()
            mask = 0
            for j, x in enumerate(nums):
                if (i >> j & 1) == 0 and x not in s:
                    s.add(x)
                    mask |= 1 << j
            if len(s) < m:
                continue
            j = mask
            while j:
                if g[j] != -1:
                    f[i | j] = min(f[i | j], f[i] + g[j])
                j = (j - 1) & mask
        return f[-1] if f[-1] != inf else -1
