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
    def minimumDistance(self, word: str) -> int:
        def dist(a: int, b: int) -> int:
            x1, y1 = divmod(a, 6)
            x2, y2 = divmod(b, 6)
            return abs(x1 - x2) + abs(y1 - y2)

        n = len(word)
        f = [[[inf] * 26 for _ in range(26)] for _ in range(n)]
        for j in range(26):
            f[0][ord(word[0]) - ord('A')][j] = 0
            f[0][j][ord(word[0]) - ord('A')] = 0
        for i in range(1, n):
            a, b = ord(word[i - 1]) - ord('A'), ord(word[i]) - ord('A')
            d = dist(a, b)
            for j in range(26):
                f[i][b][j] = min(f[i][b][j], f[i - 1][a][j] + d)
                f[i][j][b] = min(f[i][j][b], f[i - 1][j][a] + d)
                if j == a:
                    for k in range(26):
                        t = dist(k, b)
                        f[i][b][j] = min(f[i][b][j], f[i - 1][k][a] + t)
                        f[i][j][b] = min(f[i][j][b], f[i - 1][a][k] + t)
        a = min(f[n - 1][ord(word[-1]) - ord('A')])
        b = min(f[n - 1][j][ord(word[-1]) - ord('A')] for j in range(26))
        return int(min(a, b))
