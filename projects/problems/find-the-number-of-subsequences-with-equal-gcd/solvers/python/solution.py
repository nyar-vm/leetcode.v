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
  def subsequencePairCount(self, nums: list[int]) -> int:
    MOD = 1_000_000_007
    maxNum = max(nums)
    # dp[i][x][y] := number of disjoint pairs `seq1` and `seq2` of
    # nums[0..i - 1], where GCD(seq1) == x and GCD(seq2) == y
    dp = [[[0] * (maxNum + 1)
          for _ in range(maxNum + 1)]
          for _ in range(len(nums) + 1)]
    dp[0][0][0] = 1

    for i, num in enumerate(nums):
      for x in range(maxNum + 1):
        for y in range(maxNum + 1):
          # 1. Skip nums[i].
          dp[i + 1][x][y] += dp[i][x][y]
          dp[i + 1][x][y] %= MOD
          # 2. Pick nums[i] in the first subsequence.
          newX = math.gcd(x, num)
          dp[i + 1][newX][y] += dp[i][x][y]
          dp[i + 1][newX][y] %= MOD
          # 3. Pick nums[i] in the second subsequence.
          newY = math.gcd(y, num)
          dp[i + 1][x][newY] += dp[i][x][y]
          dp[i + 1][x][newY] %= MOD

    return sum(dp[-1][g][g]
               for g in range(1, maxNum + 1)) % MOD
