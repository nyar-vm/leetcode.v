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
  def minimumIncrements(self, nums: list[int], target: list[int]) -> int:
    maxMask = 1 << len(target)
    maskToLcm = {}

    for mask in range(1, maxMask):
      subset = [num for i, num in enumerate(target) if mask >> i & 1]
      maskToLcm[mask] = functools.reduce(math.lcm, subset, 1)

    # dp[mask] := the minimum number of increments to make each number in the
    # subset of target have at least one number that is a multiple in `num`,
    # where `mask` is the bitmask of the subset of target
    dp = [math.inf] * maxMask
    dp[0] = 0

    for num in nums:
      # maskToCost := (mask, cost), where `mask` is the bitmask of the subset
      # of target and `cost` is the minimum number of increments to make each
      # number in the subset of target have at least one number that is a
      # multiple in `num`
      maskToCost = [
          (mask, 0 if (remainder := num % lcm) == 0 else lcm - remainder) for mask,
          lcm in maskToLcm.items()]
      newDp = dp[:]
      for prevMask in range(maxMask):
        if dp[prevMask] == float('inf'):
          continue
        for mask, cost in maskToCost:
          nextMask = prevMask | mask
          newDp[nextMask] = min(newDp[nextMask], dp[prevMask] + cost)
      dp = newDp

    return -1 if dp[-1] == math.inf else dp[-1]
