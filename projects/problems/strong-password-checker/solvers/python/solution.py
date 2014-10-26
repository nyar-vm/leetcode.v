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
    def strongPasswordChecker(self, password: str) -> int:
        def countTypes(s):
            a = b = c = 0
            for ch in s:
                if ch.islower():
                    a = 1
                elif ch.isupper():
                    b = 1
                elif ch.isdigit():
                    c = 1
            return a + b + c

        types = countTypes(password)
        n = len(password)
        if n < 6:
            return max(6 - n, 3 - types)
        if n <= 20:
            replace = cnt = 0
            prev = '~'
            for curr in password:
                if curr == prev:
                    cnt += 1
                else:
                    replace += cnt // 3
                    cnt = 1
                    prev = curr
            replace += cnt // 3
            return max(replace, 3 - types)
        replace = cnt = 0
        remove, remove2 = n - 20, 0
        prev = '~'
        for curr in password:
            if curr == prev:
                cnt += 1
            else:
                if remove > 0 and cnt >= 3:
                    if cnt % 3 == 0:
                        remove -= 1
                        replace -= 1
                    elif cnt % 3 == 1:
                        remove2 += 1
                replace += cnt // 3
                cnt = 1
                prev = curr
        if remove > 0 and cnt >= 3:
            if cnt % 3 == 0:
                remove -= 1
                replace -= 1
            elif cnt % 3 == 1:
                remove2 += 1
        replace += cnt // 3
        use2 = min(replace, remove2, remove // 2)
        replace -= use2
        remove -= use2 * 2

        use3 = min(replace, remove // 3)
        replace -= use3
        remove -= use3 * 3
        return n - 20 + max(replace, 3 - types)
