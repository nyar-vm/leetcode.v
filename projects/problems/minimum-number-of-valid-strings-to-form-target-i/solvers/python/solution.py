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

def min(a: int, b: int) -> int:
    return a if a < b else b


class Trie:
    def __init__(self):
        self.children: List[Optional[Trie]] = [None] * 26

    def insert(self, w: str):
        node = self
        for i in map(lambda c: ord(c) - 97, w):
            if node.children[i] is None:
                node.children[i] = Trie()
            node = node.children[i]


class Solution:
    def minValidStrings(self, words: List[str], target: str) -> int:
        @cache
        def dfs(i: int) -> int:
            if i >= n:
                return 0
            node = trie
            ans = inf
            for j in range(i, n):
                k = ord(target[j]) - 97
                if node.children[k] is None:
                    break
                node = node.children[k]
                ans = min(ans, 1 + dfs(j + 1))
            return ans

        trie = Trie()
        for w in words:
            trie.insert(w)
        n = len(target)
        ans = dfs(0)
        return ans if ans < inf else -1
