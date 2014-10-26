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
    def minPushBox(self, grid: List[List[str]]) -> int:
        def f(i: int, j: int) -> int:
            return i * n + j

        def check(i: int, j: int) -> bool:
            return 0 <= i < m and 0 <= j < n and grid[i][j] != "#"

        for i, row in enumerate(grid):
            for j, c in enumerate(row):
                if c == "S":
                    si, sj = i, j
                elif c == "B":
                    bi, bj = i, j
        m, n = len(grid), len(grid[0])
        dirs = (-1, 0, 1, 0, -1)
        q = deque([(f(si, sj), f(bi, bj), 0)])
        vis = [[False] * (m * n) for _ in range(m * n)]
        vis[f(si, sj)][f(bi, bj)] = True
        while q:
            s, b, d = q.popleft()
            bi, bj = b // n, b % n
            if grid[bi][bj] == "T":
                return d
            si, sj = s // n, s % n
            for a, b in pairwise(dirs):
                sx, sy = si + a, sj + b
                if not check(sx, sy):
                    continue
                if sx == bi and sy == bj:
                    bx, by = bi + a, bj + b
                    if not check(bx, by) or vis[f(sx, sy)][f(bx, by)]:
                        continue
                    vis[f(sx, sy)][f(bx, by)] = True
                    q.append((f(sx, sy), f(bx, by), d + 1))
                elif not vis[f(sx, sy)][f(bi, bj)]:
                    vis[f(sx, sy)][f(bi, bj)] = True
                    q.appendleft((f(sx, sy), f(bi, bj), d))
        return -1
