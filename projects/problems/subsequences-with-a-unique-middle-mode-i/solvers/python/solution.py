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
  def __init__(self):
    self.MOD = 1_000_000_007

  def subsequencesWithMiddleMode(self, nums: list[int]) -> int:
    n = len(nums)
    ans = 0
    left = collections.Counter()
    right = collections.Counter()

    for i in range(2):
      left[nums[i]] += 1

    for i in range(2, n):
      right[nums[i]] += 1

    for i in range(2, n - 2):
      num = nums[i]
      right[num] -= 1
      if right[num] == 0:
        del right[num]

      leftCount = left[num]
      rightCount = right[num]
      leftOther = i - leftCount
      rightOther = n - 1 - i - rightCount

      # count[mode] = 5 -- [a a] a [a a]
      ans += math.comb(leftCount, 2) * math.comb(rightCount, 2)

      # count[mode] = 4 -- [a a] a [a ?]
      ans += math.comb(leftCount, 2) * rightCount * rightOther

      # count[mode] = 4 -- [a ?] a [a a]
      ans += leftCount * leftOther * math.comb(rightCount, 2)

      # count[mode] = 3 -- [a a] a [? ?]
      ans += math.comb(leftCount, 2) * math.comb(rightOther, 2)

      # count[mode] = 3 -- [? ?] a [a a]
      ans += math.comb(leftOther, 2) * math.comb(rightCount, 2)

      # count[mode] = 3 -- [a ?] a [a ?]
      ans += leftCount * leftOther * rightCount * rightOther

      # count[mode] = 2 -- [a ?] a [? ?]
      ans += leftCount * self._calc(num, leftOther, rightOther, left, right)

      # count[mode] = 2 -- [? ?] a [a ?]
      ans += rightCount * self._calc(num, rightOther, leftOther, right, left)

      ans %= self.MOD
      left[num] += 1

    return ans

  def _calc(
      self,
      a: int,
      other1: int,
      other2: int,
      count1: dict[int, int],
      count2: dict[int, int]
  ) -> int:
    """
    Returns the count of subsequences that have `a` as the middle number, where
    invalid subsequences are excluded.
    """
    # [a ?] a [? ?]
    res = (other1 * math.comb(other2, 2)) % self.MOD

    for b, b1 in count1.items():
      if b == a:
        continue
      b2 = count2[b]
      # Exclude triples -- [a b] a [b b].
      res = (res - b1 * math.comb(b2, 2)) % self.MOD
      # Exclude doubles -- [a b] a [b ?].
      res = (res - b1 * b2 * (other2 - b2)) % self.MOD

    for b, b2 in count2.items():
      if b == a:
        continue
      b1 = count1[b]
      # Exclude doubles -- [a ?] a [b b].
      res = (res - (other1 - b1) * math.comb(b2, 2)) % self.MOD

    return (res + self.MOD) % self.MOD
