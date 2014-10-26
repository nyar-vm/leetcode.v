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
  def minMaxSums(self, nums: list[int], k: int) -> int:
    # In a sorted array, nums[i] will be
    #   1. The maximum for subsequences formed by nums[0..i].
    #   2. The minimum for subsequences formed by nums[i..n - 1].
    #
    # The number of times nums[i] is the maximum is the same as the number of
    # times nums[n - 1 - i] is the minimum, due to the symmetry in subsequences
    # derived from the sorted order.
    #
    # To calculate the contribution of nums[i], we need to find the number of
    # ways to select at most (k - 1) elements from the range of indices where
    # nums[i] is the smallest or nums[n - 1 - i] is the largest.
    MOD = 1_000_000_007
    n = len(nums)

    def getComb(n: int, k: int) -> list[list[int]]:
      """C(n, k) = C(n - 1, k) + C(n - 1, k - 1)"""
      comb = [[0] * (k + 1) for _ in range(n + 1)]
      for i in range(n + 1):
        comb[i][0] = 1
      for i in range(1, n + 1):
        for j in range(1, k + 1):
          comb[i][j] = (comb[i - 1][j] + comb[i - 1][j - 1]) % MOD
      return comb

    comb = getComb(n, k - 1)
    ans = 0

    nums.sort()

    # i: available numbers from the left of nums[i] or
    #    available numbers from the right of nums[-1 - i]
    for i in range(n):
      count = 0
      for j in range(k):  # selected numbers
        count = (count + comb[i][j]) % MOD
      ans += nums[i] * count
      ans += nums[-1 - i] * count
      ans %= MOD

    return ans
