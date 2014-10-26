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

# 树状数组模板
class Fenwick:
    def __init__(self, n: int):
        self.tree = [0] * (n + 1)

    def add(self, i: int) -> None:
        while i < len(self.tree):
            self.tree[i] += 1
            i += i & -i

    # [1,i] 中的元素和
    def pre(self, i: int) -> int:
        res = 0
        while i > 0:
            res += self.tree[i]
            i &= i - 1
        return res

    # [l,r] 中的元素和
    def query(self, l: int, r: int) -> int:
        return self.pre(r) - self.pre(l - 1)

class Solution:
    def maxRectangleArea(self, xCoord: List[int], yCoord: List[int]) -> int:
        points = sorted(zip(xCoord, yCoord))
        ys = sorted(set(yCoord))  # 离散化用

        ans = -1
        tree = Fenwick(len(ys))
        tree.add(bisect_left(ys, points[0][1]) + 1)  # 离散化
        pre = {}
        for (x1, y1), (x2, y2) in pairwise(points):
            y = bisect_left(ys, y2) + 1  # 离散化
            tree.add(y)
            if x1 != x2:  # 两点不在同一列
                continue
            cur = tree.query(bisect_left(ys, y1) + 1, y)
            if y2 in pre and pre[y2][1] == y1 and pre[y2][2] + 2 == cur:
                ans = max(ans, (x2 - pre[y2][0]) * (y2 - y1))
            pre[y2] = (x1, y1, cur)
        return ans
