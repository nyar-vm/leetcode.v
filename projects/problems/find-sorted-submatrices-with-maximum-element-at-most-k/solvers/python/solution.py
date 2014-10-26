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

from dataclasses import dataclass


@dataclass(frozen=True)
class T:
  subarrayWidth: int
  rowIndex: int
  accumulatedSubmatrices: int


class Solution:
  def countSubmatrices(self, grid: list[list[int]], k: int) -> int:
    m = len(grid)
    n = len(grid[0])
    ans = 0
    # dp[i][j] := the number of valid subarrays ending in grid[i][j]
    dp = [[0] * n for _ in range(m)]
    # stacks[j] := the stack of valid
    # (subarray width, row index, number of accumulated submatrices) ending in
    # column j
    stacks: list[T] = [[T(0, -1, 0)] for _ in range(n)]

    for i, row in enumerate(grid):
      for j, num in enumerate(row):
        if num > k:
          stacks[j] = [T(0, i, 0)]
        else:
          dp[i][j] = 1
          if j > 0 and row[j - 1] <= k and row[j - 1] >= row[j]:
            # Extend the valid subarrays to the current number.
            dp[i][j] += dp[i][j - 1]
          width = dp[i][j]
          # Remove subarray widths greater than the current count since they
          # will become invalid.
          while stacks[j] and width < stacks[j][-1].subarrayWidth:
            stacks[j].pop()
          height = i - stacks[j][-1].rowIndex
          newSubmatrices = width * height
          accumulatedSubmatrices = (stacks[j][-1].accumulatedSubmatrices +
                                    newSubmatrices)
          ans += accumulatedSubmatrices
          stacks[j].append(T(width, i, accumulatedSubmatrices))

    return ans
