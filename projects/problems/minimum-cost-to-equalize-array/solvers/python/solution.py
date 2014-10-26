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
  def minCostToEqualizeArray(
      self,
      nums: list[int],
      cost1: int,
      cost2: int,
  ) -> int:
    MOD = 1_000_000_007
    n = len(nums)
    minNum = min(nums)
    maxNum = max(nums)
    summ = sum(nums)

    if cost1 * 2 <= cost2 or n < 3:
      totalGap = maxNum * n - summ
      return (cost1 * totalGap) % MOD

    def getMinCost(target: int) -> int:
      """Returns the minimum cost to make all numbers equal to `target`."""
      maxGap = target - minNum
      totalGap = target * n - summ
      # Pair one shallowest number with one non-shallowest number, so the worst
      # case is that we have `totalGap - maxGap` non-shallowest numbers to pair.
      pairs = min(totalGap // 2, totalGap - maxGap)
      return cost1 * (totalGap - 2 * pairs) + cost2 * pairs

    return min(getMinCost(target)
               for target in range(maxNum, 2 * maxNum)) % MOD
