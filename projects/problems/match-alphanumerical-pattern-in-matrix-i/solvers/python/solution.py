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
    def findPattern(self, board: List[List[int]], pattern: List[str]) -> List[int]:
        def check(i: int, j: int) -> bool:
            d1 = {}
            d2 = {}
            for a in range(r):
                for b in range(c):
                    x, y = i + a, j + b
                    if pattern[a][b].isdigit():
                        if int(pattern[a][b]) != board[x][y]:
                            return False
                    else:
                        if pattern[a][b] in d1 and d1[pattern[a][b]] != board[x][y]:
                            return False
                        if board[x][y] in d2 and d2[board[x][y]] != pattern[a][b]:
                            return False
                        d1[pattern[a][b]] = board[x][y]
                        d2[board[x][y]] = pattern[a][b]
            return True

        m, n = len(board), len(board[0])
        r, c = len(pattern), len(pattern[0])
        for i in range(m - r + 1):
            for j in range(n - c + 1):
                if check(i, j):
                    return [i, j]
        return [-1, -1]
