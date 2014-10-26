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
  def maxSubstringLength(self, s: str, k: int) -> bool:
    n = len(s)
    first = [n] * 26
    last = [-1] * 26
    # dp[i] := the maximum disjoint special substrings for the first i letters
    dp = [0] * (n + 1)
    seenOrder = []

    for i, c in enumerate(s):
      a = ord(c) - ord('a')
      if first[a] == n:
        first[a] = i
        seenOrder.append(c)
      last[a] = i

    for c in seenOrder:
      a = ord(c) - ord('a')
      for j in range(first[a], last[a]):
        b = ord(s[j]) - ord('a')
        first[a] = min(first[a], first[b])
        last[a] = max(last[a], last[b])

    for i, c in enumerate(s):
      a = ord(c) - ord('a')
      if last[a] != i or (first[a] == 0 and i == n - 1):
        dp[i + 1] = dp[i]
      else:  # Start a new special substring.
        dp[i + 1] = max(dp[i], 1 + dp[first[a]])

    return dp[n] >= k
