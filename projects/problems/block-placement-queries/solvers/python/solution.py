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

from sortedcontainers import SortedList


class FenwickTree:
  def __init__(self, n: int):
    self.vals = [0] * (n + 1)

  def maximize(self, i: int, val: int) -> None:
    while i < len(self.vals):
      self.vals[i] = max(self.vals[i], val)
      i += FenwickTree.lowtree(i)

  def get(self, i: int) -> int:
    res = 0
    while i > 0:
      res = max(res, self.vals[i])
      i -= FenwickTree.lowtree(i)
    return res

  @staticmethod
  def lowtree(i: int) -> int:
    return i & -i


class Solution:
  def getResults(self, queries: list[list[int]]) -> list[bool]:
    n = min(50000, len(queries) * 3)
    ans = []
    tree = FenwickTree(n + 1)
    obstacles = SortedList([0, n])  # sentinel values

    for query in queries:
      type = query[0]
      if type == 1:
        x = query[1]
        obstacles.add(x)

    for x1, x2 in itertools.pairwise(obstacles):
      tree.maximize(x2, x2 - x1)

    for query in reversed(queries):
      type = query[0]
      x = query[1]
      if type == 1:
        i = obstacles.index(x)
        next = obstacles[i + 1]
        prev = obstacles[i - 1]
        obstacles.remove(x)
        tree.maximize(next, next - prev)
      else:
        sz = query[2]
        i = obstacles.bisect_right(x)
        prev = obstacles[i - 1]
        ans.append(tree.get(prev) >= sz or x - prev >= sz)

    return ans[::-1]
