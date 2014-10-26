import heapq
import itertools
from sortedcontainers import SortedList
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

from enum import Enum


class State(Enum):
  INIT = 0
  VISITING = 1
  VISITED = 2


class Solution:
  def supersequences(self, words: list[str]) -> list[list[int]]:
    ans = []
    edges = [(string.ascii_lowercase.index(words[0]),
              string.ascii_lowercase.index(words[1]))
             for words in words]
    nodes = sorted({u for u, _ in edges} | {v for _, v in edges})
    letterToIndex = {letter: i for i, letter in enumerate(nodes)}
    graph = [[] for _ in range(len(nodes))]

    for u, v in edges:
      graph[letterToIndex[u]].append(letterToIndex[v])

    for doubledSubset in self._getMinimumSubsets(graph):
      freq = [0] * 26
      for letter in nodes:
        freq[letter] = 1
      for index in doubledSubset:
        freq[nodes[index]] = 2
      ans.append(freq)

    return ans

  def _getMinimumSubsets(self, graph: list[list[int]]) -> list[tuple[int]]:
    """
    Returns a list of the minimum subsets of nodes that do not create a cycle
    when skipped.
    """
    n = len(graph)
    for subsetSize in range(n + 1):
      doubleSubsets = []
      for doubledSubset in itertools.combinations(range(n), subsetSize):
        if not self._hasCycleSkipping(graph, set(doubledSubset)):
          doubleSubsets.append(doubledSubset)
      if doubleSubsets:
        return doubleSubsets
    return []

  def _hasCycleSkipping(
      self,
      graph: list[list[int]],
      doubledSubset: set[int]
  ) -> bool:
    """
    Returns True if there is a cycle in the `graph` when skipping any edges
    whose both endpoints are in `doubledSubset`.
    """
    states = [State.INIT] * len(graph)

    def hasCycle(u: int) -> bool:
      if states[u] == State.VISITING:
        return True
      if states[u] == State.VISITED:
        return False
      states[u] = State.VISITING
      if u not in doubledSubset:
        for v in graph[u]:
          if v in doubledSubset:
            continue
          if hasCycle(v):
            return True
      states[u] = State.VISITED
      return False

    return any(hasCycle(i) for i in range(len(graph)))
