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
    def confusingNumberII(self, n: int) -> int:
        def check(x: int) -> bool:
            y, t = 0, x
            while t:
                t, v = divmod(t, 10)
                y = y * 10 + d[v]
            return x != y

        def dfs(pos: int, limit: bool, x: int) -> int:
            if pos >= len(s):
                return int(check(x))
            up = int(s[pos]) if limit else 9
            ans = 0
            for i in range(up + 1):
                if d[i] != -1:
                    ans += dfs(pos + 1, limit and i == up, x * 10 + i)
            return ans

        d = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6]
        s = str(n)
        return dfs(0, True, 0)
