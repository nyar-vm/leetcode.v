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
    def outerTrees(self, trees: List[List[int]]) -> List[List[int]]:
        def cross(i, j, k):
            a, b, c = trees[i], trees[j], trees[k]
            return (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])

        n = len(trees)
        if n < 4:
            return trees
        trees.sort()
        vis = [False] * n
        stk = [0]
        for i in range(1, n):
            while len(stk) > 1 and cross(stk[-2], stk[-1], i) < 0:
                vis[stk.pop()] = False
            vis[i] = True
            stk.append(i)
        m = len(stk)
        for i in range(n - 2, -1, -1):
            if vis[i]:
                continue
            while len(stk) > m and cross(stk[-2], stk[-1], i) < 0:
                stk.pop()
            stk.append(i)
        stk.pop()
        return [trees[i] for i in stk]
