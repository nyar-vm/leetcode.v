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
  def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
    ans = ''
    count = [0] * 26
    possibleChars = []
    # Stores subsequences, where the length grows by 1 each time.
    q = collections.deque([''])

    for c in s:
      count[ord(c) - ord('a')] += 1

    for c in string.ascii_lowercase:
      if count[ord(c) - ord('a')] >= k:
        possibleChars.append(c)

    def isSubsequence(subseq: str, s: str, k: int) -> bool:
      i = 0  # subseq's index
      for c in s:
        if c == subseq[i]:
          i += 1
          if i == len(subseq):
            k -= 1
            if k == 0:
              return True
            i = 0
      return False

    while q:
      currSubseq = q.popleft()
      if len(currSubseq) * k > len(s):
        return ans
      for c in possibleChars:
        newSubseq = currSubseq + c
        if isSubsequence(newSubseq, s, k):
          q.append(newSubseq)
          ans = newSubseq

    return ans
