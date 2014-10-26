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
    def canDistribute(self, nums: List[int], quantity: List[int]) -> bool:
        m = len(quantity)
        s = [0] * (1 << m)
        for i in range(1, 1 << m):
            for j in range(m):
                if i >> j & 1:
                    s[i] = s[i ^ (1 << j)] + quantity[j]
                    break
        cnt = Counter(nums)
        arr = list(cnt.values())
        n = len(arr)
        f = [[False] * (1 << m) for _ in range(n)]
        for i in range(n):
            f[i][0] = True
        for i, x in enumerate(arr):
            for j in range(1, 1 << m):
                if i and f[i - 1][j]:
                    f[i][j] = True
                    continue
                k = j
                while k:
                    ok1 = j == k if i == 0 else f[i - 1][j ^ k]
                    ok2 = s[k] <= x
                    if ok1 and ok2:
                        f[i][j] = True
                        break
                    k = (k - 1) & j
        return f[-1][-1]
