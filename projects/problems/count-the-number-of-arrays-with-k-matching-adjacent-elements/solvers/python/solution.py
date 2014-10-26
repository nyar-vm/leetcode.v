import heapq
import itertools
from sortedcontainers import SortedList
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
    MOD = 10**9 + 7
    _fact = None  # Class variable for precomputed factorials
    _inv_fact = None  # Class variable for precomputed inverse factorials

    @classmethod
    def precompute(cls, max_n):
        """Precompute factorial and inverse factorial arrays up to max_n."""
        if cls._fact is not None and len(cls._fact) >= max_n + 1:
            return  # Already precomputed sufficiently
        
        cls._fact = [1] * (max_n + 1)
        for i in range(1, max_n + 1):
            cls._fact[i] = cls._fact[i-1] * i % cls.MOD
        
        cls._inv_fact = [1] * (max_n + 1)
        cls._inv_fact[max_n] = pow(cls._fact[max_n], cls.MOD - 2, cls.MOD)
        for i in range(max_n - 1, -1, -1):
            cls._inv_fact[i] = cls._inv_fact[i + 1] * (i + 1) % cls.MOD

    def countGoodArrays(self, n: int, m: int, k: int) -> int:
        if k < 0 or k > n - 1:
            return 0
        
        max_needed = n - 1
        Solution.precompute(max_needed)
        
        a = n - 1
        b = k
        # Compute combination C(a, b)
        comb = Solution._fact[a] * Solution._inv_fact[b] % self.MOD
        comb = comb * Solution._inv_fact[a - b] % self.MOD
        
        exponent = (n - k - 1)
        term = pow(m - 1, exponent, self.MOD)
        
        ans = comb * m % self.MOD
        ans = ans * term % self.MOD
        return ans
