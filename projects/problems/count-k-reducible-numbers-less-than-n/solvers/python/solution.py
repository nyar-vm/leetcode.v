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
  def countKReducibleNumbers(self, s: str, k: int) -> int:
    MOD = 1_000_000_007
    ops = self._getOps(s)

    @functools.lru_cache(None)
    def dp(i: int, setBits: int, tight: bool) -> int:
      """
      Returns the number of positive integers less than n that are k-reducible,
      considering the i-th digit, where `setBits` is the number of set bits in
      the current number, and `tight` indicates if the current digit is
      tightly bound.
      """
      if i == len(s):
        return int(ops[setBits] < k and not tight)

      res = 0
      maxDigit = int(s[i]) if tight else 1

      for d in range(maxDigit + 1):
        nextTight = tight and (d == maxDigit)
        res += dp(i + 1, setBits + d, nextTight)
        res %= MOD
      return res

    return dp(0, 0, True) - 1  # - 0

  def _getOps(self, s: str) -> int:
    """Returns the number of operations to reduce a number to 0."""
    ops = [0] * (len(s) + 1)
    for num in range(2, len(s) + 1):
      ops[num] = 1 + ops[num.bit_count()]
    return ops
