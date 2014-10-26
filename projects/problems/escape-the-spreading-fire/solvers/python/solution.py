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
    def maximumMinutes(self, grid: List[List[int]]) -> int:
        def spread(q: Deque[int]) -> Deque[int]:
            nq = deque()
            while q:
                i, j = q.popleft()
                for a, b in pairwise(dirs):
                    x, y = i + a, j + b
                    if 0 <= x < m and 0 <= y < n and not fire[x][y] and grid[x][y] == 0:
                        fire[x][y] = True
                        nq.append((x, y))
            return nq

        def check(t: int) -> bool:
            for i in range(m):
                for j in range(n):
                    fire[i][j] = False
            q1 = deque()
            for i, row in enumerate(grid):
                for j, x in enumerate(row):
                    if x == 1:
                        fire[i][j] = True
                        q1.append((i, j))
            while t and q1:
                q1 = spread(q1)
                t -= 1
            if fire[0][0]:
                return False
            q2 = deque([(0, 0)])
            vis = [[False] * n for _ in range(m)]
            vis[0][0] = True
            while q2:
                for _ in range(len(q2)):
                    i, j = q2.popleft()
                    if fire[i][j]:
                        continue
                    for a, b in pairwise(dirs):
                        x, y = i + a, j + b
                        if (
                            0 <= x < m
                            and 0 <= y < n
                            and not vis[x][y]
                            and not fire[x][y]
                            and grid[x][y] == 0
                        ):
                            if x == m - 1 and y == n - 1:
                                return True
                            vis[x][y] = True
                            q2.append((x, y))
                q1 = spread(q1)
            return False

        m, n = len(grid), len(grid[0])
        l, r = -1, m * n
        dirs = (-1, 0, 1, 0, -1)
        fire = [[False] * n for _ in range(m)]
        while l < r:
            mid = (l + r + 1) >> 1
            if check(mid):
                l = mid
            else:
                r = mid - 1
        return int(1e9) if l == m * n else l
