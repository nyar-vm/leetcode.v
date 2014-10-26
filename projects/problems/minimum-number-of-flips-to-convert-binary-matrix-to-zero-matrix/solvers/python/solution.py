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
    def minFlips(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        state = sum(1 << (i * n + j) for i in range(m) for j in range(n) if mat[i][j])
        q = deque([state])
        vis = {state}
        ans = 0
        dirs = [0, -1, 0, 1, 0, 0]
        while q:
            for _ in range(len(q)):
                state = q.popleft()
                if state == 0:
                    return ans
                for i in range(m):
                    for j in range(n):
                        nxt = state
                        for k in range(5):
                            x, y = i + dirs[k], j + dirs[k + 1]
                            if not 0 <= x < m or not 0 <= y < n:
                                continue
                            if nxt & (1 << (x * n + y)):
                                nxt -= 1 << (x * n + y)
                            else:
                                nxt |= 1 << (x * n + y)
                        if nxt not in vis:
                            vis.add(nxt)
                            q.append(nxt)
            ans += 1
        return -1
