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
    def rotateGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        def rotate(p: int, k: int):
            nums = []
            for j in range(p, n - p - 1):
                nums.append(grid[p][j])
            for i in range(p, m - p - 1):
                nums.append(grid[i][n - p - 1])
            for j in range(n - p - 1, p, -1):
                nums.append(grid[m - p - 1][j])
            for i in range(m - p - 1, p, -1):
                nums.append(grid[i][p])
            k %= len(nums)
            if k == 0:
                return
            nums = nums[k:] + nums[:k]
            k = 0
            for j in range(p, n - p - 1):
                grid[p][j] = nums[k]
                k += 1
            for i in range(p, m - p - 1):
                grid[i][n - p - 1] = nums[k]
                k += 1
            for j in range(n - p - 1, p, -1):
                grid[m - p - 1][j] = nums[k]
                k += 1
            for i in range(m - p - 1, p, -1):
                grid[i][p] = nums[k]
                k += 1

        m, n = len(grid), len(grid[0])
        for p in range(min(m, n) >> 1):
            rotate(p, k)
        return grid
