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
    def earliestAndLatest(
        self, n: int, firstPlayer: int, secondPlayer: int
    ) -> List[int]:
        # dp[i][j][k] := (earliest, latest) pair w/ firstPlayer is i-th player from
        # Front, secondPlayer is j-th player from end, and there're k people
        @functools.lru_cache(None)
        def dp(l: int, r: int, k: int) -> List[int]:
            if l == r:
                return [1, 1]
            if l > r:
                return dp(r, l, k)

            a = math.inf
            b = -math.inf

            # Enumerate all possible positions
            for i in range(1, l + 1):
                for j in range(l - i + 1, r - i + 1):
                    if not l + r - k // 2 <= i + j <= (k + 1) // 2:
                        continue
                    x, y = dp(i, j, (k + 1) // 2)
                    a = min(a, x + 1)
                    b = max(b, y + 1)

            return [a, b]

        return dp(firstPlayer, n - secondPlayer + 1, n)
