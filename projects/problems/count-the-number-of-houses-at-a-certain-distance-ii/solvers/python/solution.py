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
    def countOfPairs(self, n: int, x: int, y: int) -> List[int]:
        if abs(x - y) <= 1:
            return [2 * x for x in reversed(range(n))]
        cycle_len = abs(x - y) + 1
        n2 = n - cycle_len + 2
        res = [2 * x for x in reversed(range(n2))]
        while len(res) < n:
            res.append(0)
        res2 = [cycle_len * 2] * (cycle_len >> 1)
        if not cycle_len & 1:
            res2[-1] = cycle_len
        res2[0] -= 2
        for i in range(len(res2)):
            res[i] += res2[i]
        if x > y:
            x, y = y, x
        tail1 = x - 1
        tail2 = n - y
        for tail in (tail1, tail2):
            if not tail:
                continue
            i_mx = tail + (cycle_len >> 1)
            val_mx = 4 * min((cycle_len - 3) >> 1, tail)
            i_mx2 = i_mx - (1 - (cycle_len & 1))
            res3 = [val_mx] * i_mx
            res3[0] = 0
            res3[1] = 0
            if not cycle_len & 1:
                res3[-1] = 0
            for i, j in enumerate(range(4, val_mx, 4)):
                res3[i + 2] = j
                res3[i_mx2 - i - 1] = j
            for i in range(1, tail + 1):
                res3[i] += 2
            if not cycle_len & 1:
                mn = cycle_len >> 1
                for i in range(mn, mn + tail):
                    res3[i] += 2
            for i in range(len(res3)):
                res[i] += res3[i]
        return res
