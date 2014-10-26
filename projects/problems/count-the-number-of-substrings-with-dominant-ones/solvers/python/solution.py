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
  def numberOfSubstrings(self, s: str) -> int:
    ans = 0
    #    z^2 + z = n.
    # => z^2 + z - n = 0.
    # => z = (-1 + sqrt(1 + 4n)) / 2.
    maxZero = (-1 + math.sqrt(1 + 4 * len(s))) // 2

    # Iterate through all possible number of 0s.
    for zero in range(int(maxZero) + 1):
      lastInvalidPos = -1
      count = [0, 0]
      l = 0
      for r, c in enumerate(s):
        count[int(c)] += 1
        # Try to shrink the window to maintain the "minimum" length of the
        # valid substring.
        while l < r:
          if s[l] == '0' and count[0] > zero:
            count[0] -= 1  # Remove an extra '0'.
            lastInvalidPos = l
            l += 1
          elif s[l] == '1' and count[1] - 1 >= zero * zero:
            count[1] -= 1  # Remove an extra '1'.
            l += 1
          else:
            break  # Cannot remove more characters.
        if count[0] == zero and count[1] >= zero * zero:
          # Add valid substrings ending in s[r] to the answer. They are
          # s[lastInvalidPos + 1..r], s[lastInvalidPos + 2..r], ..., s[l..r].
          ans += l - lastInvalidPos

    return ans
