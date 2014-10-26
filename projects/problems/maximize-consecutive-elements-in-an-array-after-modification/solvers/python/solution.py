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
  def maxSelectedElements(self, nums: list[int]) -> int:
    ans = 1
    prev = -math.inf
    # the length of the longest consecutive elements (seq0) ending in the
    # previous number
    dp0 = 1
    # the length of the longest consecutive elements (seq1) ending in the
    # previous number + 1
    dp1 = 1

    for num in sorted(nums):
      if num == prev:
        dp1 = dp0 + 1  # Append `num + 1` to seq0.
      elif num == prev + 1:
        dp0 += 1  # Append `num` to seq0.
        dp1 += 1  # Add 1 to every number in seq0 and append `num + 1` to seq0.
      elif num == prev + 2:
        dp0 = dp1 + 1  # Append `num` to seq1.
        dp1 = 1        # Start a new sequence [`num + 1`].
      else:
        dp0 = 1  # Start a new sequence [`num`].
        dp1 = 1  # Start a new sequence [`num + 1`].
      ans = max(ans, dp0, dp1)
      prev = num

    return ans
