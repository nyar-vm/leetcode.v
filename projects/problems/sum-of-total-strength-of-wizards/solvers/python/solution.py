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
    def totalStrength(self, strength: List[int]) -> int:
        n = len(strength)
        left = [-1] * n
        right = [n] * n
        stk = []
        for i, v in enumerate(strength):
            while stk and strength[stk[-1]] >= v:
                stk.pop()
            if stk:
                left[i] = stk[-1]
            stk.append(i)
        stk = []
        for i in range(n - 1, -1, -1):
            while stk and strength[stk[-1]] > strength[i]:
                stk.pop()
            if stk:
                right[i] = stk[-1]
            stk.append(i)

        ss = list(accumulate(list(accumulate(strength, initial=0)), initial=0))
        mod = int(1e9) + 7
        ans = 0
        for i, v in enumerate(strength):
            l, r = left[i] + 1, right[i] - 1
            a = (ss[r + 2] - ss[i + 1]) * (i - l + 1)
            b = (ss[i + 1] - ss[l]) * (r - i + 1)
            ans = (ans + (a - b) * v) % mod
        return ans
