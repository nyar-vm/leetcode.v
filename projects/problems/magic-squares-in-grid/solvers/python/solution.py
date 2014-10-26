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
    def numMagicSquaresInside(self, grid: List[List[int]]) -> int:
        def check(i: int, j: int) -> int:
            if i + 3 > m or j + 3 > n:
                return 0
            s = set()
            row = [0] * 3
            col = [0] * 3
            a = b = 0
            for x in range(i, i + 3):
                for y in range(j, j + 3):
                    v = grid[x][y]
                    if v < 1 or v > 9:
                        return 0
                    s.add(v)
                    row[x - i] += v
                    col[y - j] += v
                    if x - i == y - j:
                        a += v
                    if x - i == 2 - (y - j):
                        b += v
            if len(s) != 9 or a != b:
                return 0
            if any(x != a for x in row) or any(x != a for x in col):
                return 0
            return 1

        m, n = len(grid), len(grid[0])
        return sum(check(i, j) for i in range(m) for j in range(n))
