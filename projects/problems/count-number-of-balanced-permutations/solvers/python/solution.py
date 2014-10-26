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
    def countBalancedPermutations(self, num: str) -> int:
        @cache
        def dfs(i: int, j: int, a: int, b: int) -> int:
            if i > 9:
                return (j | a | b) == 0
            if a == 0 and j:
                return 0
            ans = 0
            for l in range(min(cnt[i], a) + 1):
                r = cnt[i] - l
                if 0 <= r <= b and l * i <= j:
                    t = comb(a, l) * comb(b, r) * dfs(i + 1, j - l * i, a - l, b - r)
                    ans = (ans + t) % mod
            return ans

        nums = list(map(int, num))
        s = sum(nums)
        if s % 2:
            return 0
        n = len(nums)
        mod = 10**9 + 7
        cnt = Counter(nums)
        return dfs(0, s // 2, n // 2, (n + 1) // 2)
