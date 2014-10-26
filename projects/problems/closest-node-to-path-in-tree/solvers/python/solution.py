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
  def closestNode(
      self,
      n: int,
      edges: list[list[int]],
      query: list[list[int]],
  ) -> list[int]:
    tree = [[] for _ in range(n)]
    dist = [[-1] * n for _ in range(n)]

    for u, v in edges:
      tree[u].append(v)
      tree[v].append(u)

    def fillDist(start: int, u: int, d: int) -> None:
      dist[start][u] = d
      for v in tree[u]:
        if dist[start][v] == -1:
          fillDist(start, v, d + 1)

    for i in range(n):
      fillDist(i, i, 0)

    def findClosest(u: int, end: int, node: int, ans: int) -> int:
      for v in tree[u]:
        if dist[v][end] < dist[u][end]:
          return findClosest(
              v, end, node, ans if dist[ans][node] < dist[v][node] else v)
      return ans

    return [findClosest(start, end, node, start)
            for start, end, node in query]
