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
  def maxPathLength(self, coordinates: list[list[int]], k: int) -> int:
    xk, yk = coordinates[k]
    leftCoordinates = [(x, y) for x, y in coordinates if x < xk and y < yk]
    rightCoordinates = [(x, y) for x, y in coordinates if x > xk and y > yk]
    return (1 +
            self._lengthOfLIS(leftCoordinates) +
            self._lengthOfLIS(rightCoordinates))

  # Similar to 300. Longest Increasing Subsequence
  def _lengthOfLIS(self, coordinates: list[tuple[int, int]]) -> int:
    coordinates.sort(key=lambda x: (x[0], -x[1]))
    # tail[i] := the minimum tail of all the increasing subsequences having
    # length i + 1
    tail = []
    for _, y in coordinates:
      if not tail or y > tail[-1]:
        tail.append(y)
      else:
        tail[bisect.bisect_left(tail, y)] = y
    return len(tail)
