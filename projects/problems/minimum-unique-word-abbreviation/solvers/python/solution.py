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
  def minAbbreviation(self, target: str, dictionary: list[str]) -> str:
    m = len(target)

    def getMask(word: str) -> int:
      # mask[i] = 0 := target[i] == word[i]
      # mask[i] = 1 := target[i] != word[i]
      # e.g. target = "apple"
      #        word = "blade"
      #        mask =  11110
      mask = 0
      for i, c in enumerate(word):
        if c != target[i]:
          mask |= 1 << m - 1 - i
      return mask

    masks = [getMask(word) for word in dictionary if len(word) == m]
    if not masks:
      return str(m)

    abbrs = []

    def getAbbr(cand: int) -> str:
      abbr = []
      replacedCount = 0
      for i, c in enumerate(target):
        if cand >> m - 1 - i & 1:
          # If cand[i] = 1, `abbr` should show the original character.
          if replacedCount:
            abbr += str(replacedCount)
          abbr.append(c)
          replacedCount = 0
        else:
          # If cand[i] = 0, `abbr` can be replaced.
          replacedCount += 1
      if replacedCount:
        abbr.append(str(replacedCount))
      return ''.join(abbr)

    # all the candidate representation of the target
    for cand in range(2**m):
      # All the masks have at lease one bit different from the candidate.
      if all(cand & mask for mask in masks):
        abbr = getAbbr(cand)
        abbrs.append(abbr)

    def getAbbrLen(abbr: str) -> int:
      abbrLen = 0
      i = 0
      j = 0
      while i < len(abbr):
        if abbr[j].isalpha():
          j += 1
        else:
          while j < len(abbr) and abbr[j].isdigit():
            j += 1
        abbrLen += 1
        i = j
      return abbrLen

    return min(abbrs, key=lambda x: getAbbrLen(x))
