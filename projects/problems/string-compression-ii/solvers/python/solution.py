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
  def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
    def getLength(maxFreq: int) -> int:
      """Returns the length to compress `maxFreq`."""
      if maxFreq == 1:
        return 1  # c
      if maxFreq < 10:
        return 2  # [1-9]c
      if maxFreq < 100:
        return 3  # [1-9][0-9]c
      return 4    # [1-9][0-9][0-9]c

    @functools.lru_cache(None)
    def dp(i: int, k: int) -> int:
      """Returns the length of optimal dp of s[i..n) with at most k deletion."""
      if k < 0:
        return math.inf
      if i == len(s) or len(s) - i <= k:
        return 0

      ans = math.inf
      maxFreq = 0  # the maximum frequency in s[i..j]
      count = collections.Counter()

      # Make letters in s[i..j] be the same.
      # Keep the letter that has the maximum frequency in this range and remove
      # the other letters.
      for j in range(i, len(s)):
        count[s[j]] += 1
        maxFreq = max(maxFreq, count[s[j]])
        ans = min(ans, getLength(maxFreq) +
                  dp(j + 1, k - (j - i + 1 - maxFreq)))

      return ans

    return dp(0, k)
