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
  def makeStringGood(self, s: str) -> int:
    count = [0] * 26
    for c in s:
      count[ord(c) - ord('a')] += 1
    return min(self._getMinOperations(count, target)
               for target in range(1, max(count) + 1))

  def _getMinOperations(self, count: list[int], target: int) -> int:
    # dp[i] represents the minimum number of operations to make the frequency of
    # (i..25)-th (0-indexed) letters equal to `target`.
    dp = [0] * 27

    for i in range(25, -1, -1):
      # 1. Delete all the i-th letters.
      deleteAllToZero = count[i]
      # 2. Insert/delete the i-th letters to have `target` number of letters.
      deleteOrInsertToTarget = abs(target - count[i])
      dp[i] = min(deleteAllToZero, deleteOrInsertToTarget) + dp[i + 1]
      if i + 1 < 26 and count[i + 1] < target:
        nextDeficit = target - count[i + 1]
        # Make the frequency of the i-th letter equal to the `target` or 0.
        needToChange = count[i] if count[i] <= target else count[i] - target
        changeToTarget = (
            # 3. Change all the i-th letters to the next letter and then
            # insert the remaining deficit for the next letter.
            needToChange + (nextDeficit - needToChange) if nextDeficit > needToChange
            # 4. Change `nextDeficit` i-th letters to the next letter and
            # then delete the remaining i-th letters.
            else nextDeficit + (needToChange - nextDeficit)
        )
        dp[i] = min(dp[i], changeToTarget + dp[i + 2])

    return dp[0]
