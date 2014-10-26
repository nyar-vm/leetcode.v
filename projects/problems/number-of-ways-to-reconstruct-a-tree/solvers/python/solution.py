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
    def checkWays(self, pairs: List[List[int]]) -> int:
        g = [[False] * 510 for _ in range(510)]
        v = defaultdict(list)
        for x, y in pairs:
            g[x][y] = g[y][x] = True
            v[x].append(y)
            v[y].append(x)
        nodes = []
        for i in range(510):
            if v[i]:
                nodes.append(i)
                g[i][i] = True
        nodes.sort(key=lambda x: len(v[x]))
        equal = False
        root = 0
        for i, x in enumerate(nodes):
            j = i + 1
            while j < len(nodes) and not g[x][nodes[j]]:
                j += 1
            if j < len(nodes):
                y = nodes[j]
                if len(v[x]) == len(v[y]):
                    equal = True
                for z in v[x]:
                    if not g[y][z]:
                        return 0
            else:
                root += 1
        if root > 1:
            return 0
        return 2 if equal else 1
