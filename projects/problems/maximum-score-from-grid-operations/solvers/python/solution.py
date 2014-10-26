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
  def maximumScore(self, grid: list[list[int]]) -> int:
    n = len(grid)
    # prefix[j][i] := the sum of the first i elements in the j-th column
    prefix = [[0] * (n + 1) for _ in range(n)]
    # prevPick[i] := the maximum score up to the previous column, where the
    # bottommost selected element in the previous column is in row (i - 1)
    prevPick = [0] * (n + 1)
    # prevSkip[i] := the maximum score up to the previous column, where the
    # bottommost selected element in the column before the previous one is in
    # row (i - 1)
    prevSkip = [0] * (n + 1)

    for j in range(n):
      for i in range(n):
        prefix[j][i + 1] = prefix[j][i] + grid[i][j]

    for j in range(1, n):
      currPick = [0] * (n + 1)
      currSkip = [0] * (n + 1)
      # Consider all possible combinations of the number of current and
      # previous selected elements.
      for curr in range(n + 1):  # the number of current selected elements
        for prev in range(n + 1):  # the number of previous selected elements
          if curr > prev:
            # 1. The current bottom is deeper than the previous bottom.
            # Get the score of grid[prev..curr)[j - 1] for both pick and skip.
            score = prefix[j - 1][curr] - prefix[j - 1][prev]
            currPick[curr] = max(currPick[curr], prevSkip[prev] + score)
            currSkip[curr] = max(currSkip[curr], prevSkip[prev] + score)
          else:
            # 2. The previous bottom is deeper than the current bottom.
            # Get the score of grid[curr..prev)[j] for pick only.
            score = prefix[j][prev] - prefix[j][curr]
            currPick[curr] = max(currPick[curr], prevPick[prev] + score)
            currSkip[curr] = max(currSkip[curr], prevPick[prev])
      prevPick = currPick
      prevSkip = currSkip

    return max(prevPick)
