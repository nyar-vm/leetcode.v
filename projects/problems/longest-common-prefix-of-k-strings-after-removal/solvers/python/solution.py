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

class TrieNode:
  def __init__(self):
    self.children: dict[str, TrieNode] = {}
    self.count = 0


class Trie:
  def __init__(self, k: int):
    self.k = k
    self.root = TrieNode()
    self.prefixLengthsCount = collections.Counter()
    self.prefixLengths = SortedList()

  def insert(self, word: str) -> None:
    node = self.root
    for i, c in enumerate(word):
      sz = i + 1
      node = node.children.setdefault(c, TrieNode())
      node.count += 1
      if node.count >= self.k:
        self.prefixLengthsCount[sz] += 1
        if self.prefixLengthsCount[sz] == 1:
          self.prefixLengths.add(-sz)

  def erase(self, word: str) -> None:
    node = self.root
    for i, c in enumerate(word):
      sz = i + 1
      node = node.children[c]
      if node.count == self.k:
        self.prefixLengthsCount[sz] -= 1
        if self.prefixLengthsCount[sz] == 0:
          self.prefixLengths.remove(-sz)
      node.count -= 1

  def getLongestCommonPrefix(self) -> int:
    return 0 if not self.prefixLengths else -self.prefixLengths[0]


class Solution:
  def longestCommonPrefix(self, words: list[str], k: int) -> list[int]:
    ans = []
    trie = Trie(k)

    for word in words:
      trie.insert(word)

    for word in words:
      trie.erase(word)
      ans.append(trie.getLongestCommonPrefix())
      trie.insert(word)

    return ans
