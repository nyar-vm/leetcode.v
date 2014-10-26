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
  def generateString(self, str1: str, str2: str) -> str:
    n = len(str1)
    m = len(str2)
    sz = n + m - 1
    ans = [None] * sz
    modifiable = [True] * sz

    # 1. Handle all 'T' positions first.
    for i, tf in enumerate(str1):
      if tf == 'T':
        for j, c in enumerate(str2):
          pos = i + j
          if ans[pos] and ans[pos] != c:
            return ''
          ans[pos] = c
          modifiable[pos] = False

    # 2. Fill all remaining positions with 'a'.
    for i in range(sz):
      if not ans[i]:
        ans[i] = 'a'

    # 3. Handle all 'F' positions.
    for i in range(n):
      if str1[i] == 'F' and self._match(ans, i, str2):
        modifiablePos = self._lastModifiablePosition(i, m, modifiable)
        if modifiablePos == -1:
          return ''
        ans[modifiablePos] = 'b'
        modifiable[modifiablePos] = False

    return ''.join(ans)

  def _match(self, ans: list, i: int, s: str) -> bool:
    """Returns True if the substring of ans starting at `i` matches `s`."""
    for j, c in enumerate(s):
      if ans[i + j] != c:
        return False
    return True

  def _lastModifiablePosition(self, i: int, m: int, modifiable: list) -> int:
    """
    Finds the last modifiable position in the substring of ans starting at `i`.
    """
    modifiablePos = -1
    for j in range(m):
      pos = i + j
      if modifiable[pos]:
        modifiablePos = pos
    return modifiablePos
