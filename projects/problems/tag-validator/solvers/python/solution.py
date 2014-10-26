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
    def isValid(self, code: str) -> bool:
        def check(tag):
            return 1 <= len(tag) <= 9 and all(c.isupper() for c in tag)

        stk = []
        i, n = 0, len(code)
        while i < n:
            if i and not stk:
                return False
            if code[i : i + 9] == '<![CDATA[':
                i = code.find(']]>', i + 9)
                if i < 0:
                    return False
                i += 2
            elif code[i : i + 2] == '</':
                j = i + 2
                i = code.find('>', j)
                if i < 0:
                    return False
                t = code[j:i]
                if not check(t) or not stk or stk.pop() != t:
                    return False
            elif code[i] == '<':
                j = i + 1
                i = code.find('>', j)
                if i < 0:
                    return False
                t = code[j:i]
                if not check(t):
                    return False
                stk.append(t)
            i += 1
        return not stk
