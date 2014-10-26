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
  def maxSum(self, nums: list[int], k: int, m: int) -> int:
    INF = 20_000_000
    n = len(nums)
    prefix = list(itertools.accumulate(nums, initial=0))

    @functools.lru_cache(None)
    def dp(i: int, ongoing: int, k: int) -> int:
      if k < 0:
        return -INF
      if i == n:
        return 0 if k == 0 else -INF
      if ongoing == 1:
        # 1. End the current subarray (transition to state 0, same index i)
        # 2. Extend the current subarray by picking nums[i] and move to i + 1
        return max(dp(i, 0, k),
                   dp(i + 1, 1, k) + nums[i])
      # ongoing == 0
      # 1. Skip nums[i]
      # 2. Pick nums[i:i+m] (only if k > 0 and there're enough elements)
      res = dp(i + 1, 0, k)
      if i + m <= n:  # If we have enough elements for a new segment
        res = max(res,
                  dp(i + m, 1, k - 1) + (prefix[i + m] - prefix[i]))
      return res

    return dp(0, 0, k)
