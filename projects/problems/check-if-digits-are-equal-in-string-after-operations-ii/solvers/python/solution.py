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
  # Same as 3461. Check If Digits Are Equal in String After Operations I
  def hasSameDigits(self, s: str) -> bool:
    n = len(s)
    num1 = 0
    num2 = 0

    for i in range(n - 1):
      coefficient = self._nCMOD10(n - 2, i)
      num1 += (coefficient * (int(s[i]) - 0)) % 10
      num1 %= 10
      num2 += (coefficient * (int(s[i + 1]) - 0)) % 10
      num2 %= 10

    return num1 == num2

  def _nCMOD10(self, n: int, k: int) -> int:
    """Returns (n, k) % 10."""
    mod2 = self._lucasTheorem(n, k, 2)
    mod5 = self._lucasTheorem(n, k, 5)
    lookup = [
        [0, 6, 2, 8, 4],  # mod2 == 0
        [5, 1, 7, 3, 9]   # mod2 == 1
    ]
    return lookup[mod2][mod5]

  def _lucasTheorem(self, n: int, k: int, prime: int) -> int:
    """Returns (n, k) % prime."""
    res = 1
    while n > 0 or k > 0:
      nMod = n % prime
      MOD = k % prime
      res *= math.comb(nMod, MOD)
      res %= prime
      n //= prime
      k //= prime
    return res
