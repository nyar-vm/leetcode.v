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
class Sequence:
  startX: int
  startY: int
  endX: int
  endY: int
  length: int

  def __iter__(self):
    yield self.startX
    yield self.startY
    yield self.endX
    yield self.endY
    yield self.length


class Solution:
  def maxDistance(self, side: int, points: list[list[int]], k: int) -> int:
    ordered = self._getOrderedPoints(side, points)

    def isValidDistance(m: int) -> bool:
      """
      Returns True if we can select `k` points such that the minimum Manhattan
      distance between any two consecutive chosen points is at least `m`.
      """
      dq = collections.deque([Sequence(*ordered[0], *ordered[0], 1)])
      maxLength = 1

      for i in range(1, len(ordered)):
        x, y = ordered[i]
        startX, startY = ordered[i]
        length = 1
        while dq and abs(x - dq[0].endX) + abs(y - dq[0].endY) >= m:
          if (abs(x - dq[0].startX) + abs(y - dq[0].startY) >= m
                  and dq[0].length + 1 >= length):
            startX = dq[0].startX
            startY = dq[0].startY
            length = dq[0].length + 1
            maxLength = max(maxLength, length)
          dq.popleft()
        dq.append(Sequence(startX, startY, x, y, length))

      return maxLength >= k

    l = 0
    r = side

    while l < r:
      m = (l + r + 1) // 2
      if isValidDistance(m):
        l = m
      else:
        r = m - 1

    return l

  def _getOrderedPoints(self, side: int, points: list[list[int]]) -> list[list[int]]:
    """
    Returns the ordered points on the perimeter of a square of side length
    `side`, starting from left, top, right, and bottom boundaries.
    """
    left = sorted([(x, y) for x, y in points if x == 0 and y > 0])
    top = sorted([(x, y) for x, y in points if x > 0 and y == side])
    right = sorted([(x, y) for x, y in points if x == side and y < side],
                   reverse=True)
    bottom = sorted([(x, y) for x, y in points if y == 0], reverse=True)
    return left + top + right + bottom
