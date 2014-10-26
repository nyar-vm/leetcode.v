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
  def ipToCIDR(self, ip: str, n: int) -> list[str]:
    ans = []
    num = self._getNum(ip.split('.'))

    while n > 0:
      lowbit = num & -num
      count = self._maxLow(n) if lowbit == 0 else self._firstFit(lowbit, n)
      ans.append(self._getCIDR(num, self._getPrefix(count)))
      n -= count
      num += count

    return ans

  def _getNum(self, x: list[str]) -> int:
    num = 0
    for i in range(4):
      num = num * 256 + int(x[i])
    return num

  def _maxLow(self, n: int) -> int | None:
    """Returns the maximum i s.t. 2^i < n."""
    for i in range(32):
      if 1 << i + 1 > n:
        return 1 << i

  def _firstFit(self, lowbit: int, n: int) -> int:
    while lowbit > n:
      lowbit >>= 1
    return lowbit

  def _getCIDR(self, num: int, prefix: int) -> str:
    d = num & 255
    num >>= 8
    c = num & 255
    num >>= 8
    b = num & 255
    num >>= 8
    a = num & 255
    return '.'.join([str(s) for s in [a, b, c, d]]) + '/' + str(prefix)

  def _getPrefix(self, count: int) -> int | None:
    """
    e.g. count = 8 = 2^3 . prefix = 32 - 3 = 29
         count = 1 = 2^0 . prefix = 32 - 0 = 32
    """
    for i in range(32):
      if count == 1 << i:
        return 32 - i
