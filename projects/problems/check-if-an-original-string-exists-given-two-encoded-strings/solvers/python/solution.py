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
  def possiblyEquals(self, s1: str, s2: str) -> bool:
    def getNums(s: str) -> set[int]:
      nums = {int(s)}
      for i in range(1, len(s)):
        nums |= {x + y for x in getNums(s[:i]) for y in getNums(s[i:])}
      return nums

    def getNextLetterIndex(s: str, i: int) -> int:
      j = i
      while j < len(s) and s[j].isdigit():
        j += 1
      return j

    @functools.lru_cache(None)
    def dp(i: int, j: int, paddingDiff: int) -> bool:
      """
      Returns True if s1[i..n) matches s2[j..n), accounting for the padding
      difference. Here, `paddingDiff` represents the signed padding. A positive
      `paddingDiff` indicates that s1 has an additional number of offset bytes
      compared to s2.
      """
      if i == len(s1) and j == len(s2):
        return paddingDiff == 0
      # Add padding on s1.
      if i < len(s1) and s1[i].isdigit():
        nextLetterIndex = getNextLetterIndex(s1, i)
        for num in getNums(s1[i:nextLetterIndex]):
          if dp(nextLetterIndex, j, paddingDiff + num):
            return True
      # Add padding on s2.
      elif j < len(s2) and s2[j].isdigit():
        nextLetterIndex = getNextLetterIndex(s2, j)
        for num in getNums(s2[j:nextLetterIndex]):
          if dp(i, nextLetterIndex, paddingDiff - num):
            return True
      # `s1` has more padding, so j needs to catch up.
      elif paddingDiff > 0:
        if j < len(s2):
          return dp(i, j + 1, paddingDiff - 1)
      # `s2` has more padding, so i needs to catch up.
      elif paddingDiff < 0:
        if i < len(s1):
          return dp(i + 1, j, paddingDiff + 1)
      # There's no padding difference, so consume the next letter.
      else:  # paddingDiff == 0
        if i < len(s1) and j < len(s2) and s1[i] == s2[j]:
          return dp(i + 1, j + 1, 0)
      return False

    return dp(0, 0, 0)
