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
  def validSequence(self, word1: str, word2: str) -> list[int]:
    ans = []
    # last[j] := the index i of the last occurrence in word1, where
    # word1[i] == word2[j]
    last = [-1] * len(word2)

    i = len(word1) - 1
    j = len(word2) - 1
    while i >= 0 and j >= 0:
      if word1[i] == word2[j]:
        last[j] = i
        j -= 1
      i -= 1

    canSkip = True
    j = 0
    for i, c in enumerate(word1):
      if j == len(word2):
        break
      if c == word2[j]:
        ans.append(i)
        j += 1
      elif canSkip and (j == len(word2) - 1 or i < last[j + 1]):
        canSkip = False
        ans.append(i)
        j += 1

    return ans if j == len(word2) else []
