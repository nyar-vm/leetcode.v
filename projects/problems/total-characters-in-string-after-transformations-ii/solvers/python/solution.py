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
  # Similar to 3335. Total Characters in String After Transformations I
  def lengthAfterTransformations(self, s: str, t: int, nums: list[int]) -> int:
    MOD = 1_000_000_007

    def matrixMult(A: list[list[int]], B: list[list[int]]) -> list[list[int]]:
      """Returns A * B."""
      sz = len(A)
      C = [[0] * sz for _ in range(sz)]
      for i in range(sz):
        for j in range(sz):
          for k in range(sz):
            C[i][j] += A[i][k] * B[k][j]
            C[i][j] %= MOD
      return C

    def matrixPow(M: list[list[int]], n: int) -> list[list[int]]:
      """Returns M^n."""
      if n == 0:
        return [[1 if i == j else 0  # identity matrix
                for j in range(len(M))]
                for i in range(len(M))]
      if n % 2 == 1:
        return matrixMult(M, matrixPow(M, n - 1))
      return matrixPow(matrixMult(M, M), n // 2)

    # T[i][j] := the number of ways to transform ('a' + i) to ('a' + j)
    T = self._getTransformationMatrix(nums)
    poweredT = matrixPow(T, t)
    count = [0] * 26
    lengths = [0] * 26

    for c in s:
      count[ord(c) - ord('a')] += 1

    for i in range(26):
      for j in range(26):
        lengths[j] += count[i] * poweredT[i][j]
        lengths[j] %= MOD

    return sum(lengths) % MOD

  def _getTransformationMatrix(self, nums: list[int]) -> list[list[int]]:
    T = [[0] * 26 for _ in range(26)]
    for i, steps in enumerate(nums):
      for step in range(1, steps + 1):
        T[i][(i + step) % 26] += 1
    return T
