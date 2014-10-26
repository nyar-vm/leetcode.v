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
    def solveEquation(self, equation: str) -> str:
        def f(s):
            x = y = 0
            if s[0] != '-':
                s = '+' + s
            i, n = 0, len(s)
            while i < n:
                sign = 1 if s[i] == '+' else -1
                i += 1
                j = i
                while j < n and s[j] not in '+-':
                    j += 1
                v = s[i:j]
                if v[-1] == 'x':
                    x += sign * (int(v[:-1]) if len(v) > 1 else 1)
                else:
                    y += sign * int(v)
                i = j
            return x, y

        a, b = equation.split('=')
        x1, y1 = f(a)
        x2, y2 = f(b)
        if x1 == x2:
            return 'Infinite solutions' if y1 == y2 else 'No solution'
        return f'x={(y2 - y1) // (x1 - x2)}'
