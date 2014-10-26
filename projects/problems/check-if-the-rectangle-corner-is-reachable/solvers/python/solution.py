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
    def canReachCorner(
        self, xCorner: int, yCorner: int, circles: List[List[int]]
    ) -> bool:
        def in_circle(x: int, y: int, cx: int, cy: int, r: int) -> int:
            return (x - cx) ** 2 + (y - cy) ** 2 <= r**2

        def cross_left_top(cx: int, cy: int, r: int) -> bool:
            a = abs(cx) <= r and 0 <= cy <= yCorner
            b = abs(cy - yCorner) <= r and 0 <= cx <= xCorner
            return a or b

        def cross_right_bottom(cx: int, cy: int, r: int) -> bool:
            a = abs(cx - xCorner) <= r and 0 <= cy <= yCorner
            b = abs(cy) <= r and 0 <= cx <= xCorner
            return a or b

        def dfs(i: int) -> bool:
            x1, y1, r1 = circles[i]
            if cross_right_bottom(x1, y1, r1):
                return True
            vis[i] = True
            for j, (x2, y2, r2) in enumerate(circles):
                if vis[j] or not ((x1 - x2) ** 2 + (y1 - y2) ** 2 <= (r1 + r2) ** 2):
                    continue
                if (
                    (x1 * r2 + x2 * r1 < (r1 + r2) * xCorner)
                    and (y1 * r2 + y2 * r1 < (r1 + r2) * yCorner)
                    and dfs(j)
                ):
                    return True
            return False

        vis = [False] * len(circles)
        for i, (x, y, r) in enumerate(circles):
            if in_circle(0, 0, x, y, r) or in_circle(xCorner, yCorner, x, y, r):
                return False
            if (not vis[i]) and cross_left_top(x, y, r) and dfs(i):
                return False
        return True
