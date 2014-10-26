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
  def possibleStringCount(self, word: str, k: int) -> int:
    MOD = 1_000_000_007
    groups = self._getConsecutiveLetters(word)
    totalCombinations = functools.reduce(lambda subtotal, group:
                                         subtotal * group % MOD, groups)
    if k <= len(groups):
      return totalCombinations

    # dp[j] := the number of ways to form strings of length j using groups[0..i]
    dp = [0] * k
    dp[0] = 1  # Base case: empty string

    for i, group in enumerate(groups):
      newDp = [0] * k
      windowSum = 0
      for j in range(i, k):
        newDp[j] = (newDp[j] + windowSum) % MOD
        windowSum = (windowSum + dp[j]) % MOD
        if j >= group:
          windowSum = (windowSum - dp[j - group] + MOD) % MOD
      dp = newDp

    return (totalCombinations - sum(dp)) % MOD

  def _getConsecutiveLetters(self, word: str) -> list[int]:
    """
    Returns consecutive identical letters in the input string.
    e.g. "aabbbc" -> [2, 3, 1].
    """
    groups = []
    group = 1
    for i in range(1, len(word)):
      if word[i] == word[i - 1]:
        group += 1
      else:
        groups.append(group)
        group = 1
    groups.append(group)
    return groups
