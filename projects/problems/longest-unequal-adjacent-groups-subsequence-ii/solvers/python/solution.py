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

from typing import List

class Solution:
    def getWordsInLongestSubsequence(self, words: List[str], groups: List[int]) -> List[str]:
        n = len(words)
        if n == 0:
            return []
        lengths = [len(word) for word in words]
        dp = [(1, -1) for _ in range(n)]
        max_len = 1
        best_idx = 0
        
        for i in range(n):
            for j in range(i):
                if groups[i] != groups[j] and lengths[i] == lengths[j]:
                    s = words[j]
                    t = words[i]
                    diff = 0
                    for a, b in zip(s, t):
                        if a != b:
                            diff += 1
                            if diff > 1:
                                break
                    if diff == 1:
                        if dp[j][0] + 1 > dp[i][0]:
                            dp[i] = (dp[j][0] + 1, j)
            if dp[i][0] > max_len:
                max_len = dp[i][0]
                best_idx = i
        
        path = []
        current = best_idx
        while current != -1:
            path.append(current)
            current = dp[current][1]
        path = path[::-1]
        return [words[i] for i in path]
