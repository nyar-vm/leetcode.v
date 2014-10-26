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
  def maxProduct(self, s: str) -> int:
    n = len(s)

    def manacher(s: str) -> list[int]:
      maxExtends = [0] * n
      leftToRight = [1] * n
      center = 0

      for i in range(n):
        r = center + maxExtends[center] - 1
        mirrorIndex = center - (i - center)
        extend = 1 if i > r else min(maxExtends[mirrorIndex], r - i + 1)
        while i - extend >= 0 and i + extend < n and s[i - extend] == s[i + extend]:
          leftToRight[i + extend] = 2 * extend + 1
          extend += 1
        maxExtends[i] = extend
        if i + maxExtends[i] >= r:
          center = i

      for i in range(1, n):
        leftToRight[i] = max(leftToRight[i], leftToRight[i - 1])

      return leftToRight

    # maxLeft[i] := the maximum odd length of palindromes in s[0..i]
    maxLeft = manacher(s)
    # maxRight[i] := the maximum odd length of palindromes in s[i..n - 1]
    maxRight = manacher(s[::-1])[::-1]
    return max(maxLeft[i - 1] * maxRight[i] for i in range(1, n))
