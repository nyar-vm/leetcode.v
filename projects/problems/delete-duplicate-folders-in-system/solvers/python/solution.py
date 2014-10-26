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
    self.deleted = False


class Solution:
  def deleteDuplicateFolder(self, paths: list[list[str]]) -> list[list[str]]:
    ans = []
    root = TrieNode()
    subtreeToNodes: dict[str, list[TrieNode]] = collections.defaultdict(list)

    # Construct the Trie
    for path in sorted(paths):
      node = root
      for s in path:
        node = node.children.setdefault(s, TrieNode())

    # For each subtree, fill in the {subtree encoding: [root]} hash table
    def buildSubtreeToRoots(node: TrieNode) -> str:
      subtree = '(' + ''.join(s + buildSubtreeToRoots(node.children[s])
                              for s in node.children) + ')'
      if subtree != '()':
        subtreeToNodes[subtree].append(node)
      return subtree

    buildSubtreeToRoots(root)

    # Mark nodes that should be deleted
    for nodes in subtreeToNodes.values():
      if len(nodes) > 1:
        for node in nodes:
          node.deleted = True

    # Construct the answer array for nodes that haven't been deleted
    def constructPath(node: TrieNode, path: list[str]) -> None:
      for s, child in node.children.items():
        if not child.deleted:
          constructPath(child, path + [s])
      if path:
        ans.append(path)

    constructPath(root, [])
    return ans
