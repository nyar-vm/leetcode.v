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
    def minimumSum(self, grid: List[List[int]]) -> int:
        def f(i1: int, j1: int, i2: int, j2: int) -> int:
            x1 = y1 = inf
            x2 = y2 = -inf
            for i in range(i1, i2 + 1):
                for j in range(j1, j2 + 1):
                    if grid[i][j] == 1:
                        x1 = min(x1, i)
                        y1 = min(y1, j)
                        x2 = max(x2, i)
                        y2 = max(y2, j)
            return (x2 - x1 + 1) * (y2 - y1 + 1)

        m, n = len(grid), len(grid[0])
        ans = m * n
        for i1 in range(m - 1):
            for i2 in range(i1 + 1, m - 1):
                ans = min(
                    ans,
                    f(0, 0, i1, n - 1)
                    + f(i1 + 1, 0, i2, n - 1)
                    + f(i2 + 1, 0, m - 1, n - 1),
                )
        for j1 in range(n - 1):
            for j2 in range(j1 + 1, n - 1):
                ans = min(
                    ans,
                    f(0, 0, m - 1, j1)
                    + f(0, j1 + 1, m - 1, j2)
                    + f(0, j2 + 1, m - 1, n - 1),
                )
        for i in range(m - 1):
            for j in range(n - 1):
                ans = min(
                    ans,
                    f(0, 0, i, j) + f(0, j + 1, i, n - 1) + f(i + 1, 0, m - 1, n - 1),
                )
                ans = min(
                    ans,
                    f(0, 0, i, n - 1)
                    + f(i + 1, 0, m - 1, j)
                    + f(i + 1, j + 1, m - 1, n - 1),
                )

                ans = min(
                    ans,
                    f(0, 0, i, j) + f(i + 1, 0, m - 1, j) + f(0, j + 1, m - 1, n - 1),
                )
                ans = min(
                    ans,
                    f(0, 0, m - 1, j)
                    + f(0, j + 1, i, n - 1)
                    + f(i + 1, j + 1, m - 1, n - 1),
                )
        return ans
