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
    def largestMagicSquare(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        rowsum = [[0] * (n + 1) for _ in range(m + 1)]
        colsum = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                rowsum[i][j] = rowsum[i][j - 1] + grid[i - 1][j - 1]
                colsum[i][j] = colsum[i - 1][j] + grid[i - 1][j - 1]

        def check(x1, y1, x2, y2):
            val = rowsum[x1 + 1][y2 + 1] - rowsum[x1 + 1][y1]
            for i in range(x1 + 1, x2 + 1):
                if rowsum[i + 1][y2 + 1] - rowsum[i + 1][y1] != val:
                    return False
            for j in range(y1, y2 + 1):
                if colsum[x2 + 1][j + 1] - colsum[x1][j + 1] != val:
                    return False
            s, i, j = 0, x1, y1
            while i <= x2:
                s += grid[i][j]
                i += 1
                j += 1
            if s != val:
                return False
            s, i, j = 0, x1, y2
            while i <= x2:
                s += grid[i][j]
                i += 1
                j -= 1
            if s != val:
                return False
            return True

        for k in range(min(m, n), 1, -1):
            i = 0
            while i + k - 1 < m:
                j = 0
                while j + k - 1 < n:
                    i2, j2 = i + k - 1, j + k - 1
                    if check(i, j, i2, j2):
                        return k
                    j += 1
                i += 1
        return 1
