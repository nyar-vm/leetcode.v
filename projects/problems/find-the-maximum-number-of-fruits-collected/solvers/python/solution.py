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
  def maxCollectedFruits(self, fruits: list[list[int]]) -> int:
    n = len(fruits)

    def getTopLeft() -> int:
      return sum(fruits[i][i] for i in range(n))

    def getTopRight() -> int:
      # dp[i][j] := the number of fruits collected from (0, n - 1) to (i, j)
      dp = [[0] * n for _ in range(n)]
      dp[0][-1] = fruits[0][-1]
      for x in range(n):
        for y in range(n):
          if x >= y and (x, y) != (n - 1, n - 1):
            continue
          for dx, dy in [(1, -1), (1, 0), (1, 1)]:
            i = x - dx
            j = y - dy
            if i < 0 or i == n or j < 0 or j == n:
              continue
            if i < j < n - 1 - i:
              continue
            dp[x][y] = max(dp[x][y], dp[i][j] + fruits[x][y])
      return dp[-1][-1]

    def getBottomLeft() -> int:
      # dp[i][j] := the number of fruits collected from (n - 1, 0) to (i, j)
      dp = [[0] * n for _ in range(n)]
      dp[-1][0] = fruits[-1][0]
      for y in range(n):
        for x in range(n):
          if x <= y and (x, y) != (n - 1, n - 1):
            continue
          for dx, dy in [(-1, 1), (0, 1), (1, 1)]:
            i = x - dx
            j = y - dy
            if i < 0 or i == n or j < 0 or j == n:
              continue
            if j < i < n - 1 - j:
              continue
            dp[x][y] = max(dp[x][y], dp[i][j] + fruits[x][y])
      return dp[-1][-1]

    return getTopLeft() + getTopRight() + getBottomLeft() - 2 * fruits[-1][-1]
