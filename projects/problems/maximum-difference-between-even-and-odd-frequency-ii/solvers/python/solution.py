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
  def maxDifference(self, s: str, k: int) -> int:
    ans = -math.inf
    permutations = [(a, b) for a in '01234' for b in '01234' if a != b]

    for a, b in permutations:
      # minDiff[(parityA, parityB)] := min(a - b) of all valid windows with
      # parityA and parityB
      minDiff = collections.defaultdict(lambda: math.inf)
      prefixA = [0]  # prefixA[i] := the number of 'a's in s[0..i)
      prefixB = [0]  # prefixB[i] := the number of 'b's in s[0..i)

      l = 0
      for r, c in enumerate(s):
        prefixA.append(prefixA[-1] + int(c == a))
        prefixB.append(prefixB[-1] + int(c == b))
        while (r - l + 1 >= k and  # the window size >= k
               prefixA[l] < prefixA[-1] and  # the number of 'a's > 0
               prefixB[l] < prefixB[-1]):  # the number of 'b's > 0
          paritiesKey = (prefixA[l] % 2, prefixB[l] % 2)
          minDiff[paritiesKey] = min(minDiff[paritiesKey],
                                     prefixA[l] - prefixB[l])
          l += 1
        ans = max(ans, (prefixA[-1] - prefixB[-1]) -
                  minDiff[(1 - prefixA[-1] % 2, prefixB[-1] % 2)])

    return ans
