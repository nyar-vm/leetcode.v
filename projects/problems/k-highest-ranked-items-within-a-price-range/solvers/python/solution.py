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
    def highestRankedKItems(
        self, grid: List[List[int]], pricing: List[int], start: List[int], k: int
    ) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        row, col = start
        low, high = pricing
        q = deque([(row, col)])
        pq = []
        if low <= grid[row][col] <= high:
            pq.append((0, grid[row][col], row, col))
        grid[row][col] = 0
        dirs = (-1, 0, 1, 0, -1)
        step = 0
        while q:
            step += 1
            for _ in range(len(q)):
                x, y = q.popleft()
                for a, b in pairwise(dirs):
                    nx, ny = x + a, y + b
                    if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] > 0:
                        if low <= grid[nx][ny] <= high:
                            pq.append((step, grid[nx][ny], nx, ny))
                        grid[nx][ny] = 0
                        q.append((nx, ny))
        pq.sort()
        return [list(x[2:]) for x in pq[:k]]
