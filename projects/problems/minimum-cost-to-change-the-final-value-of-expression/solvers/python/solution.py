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
  def minOperationsToFlip(self, expression: str) -> int:
    stack = []  # [(the expression, the cost to toggle the expression)]

    for e in expression:
      if e in '(&|':
        # These aren't expressions, so the cost is meaningless.
        stack.append((e, 0))
        continue
      if e == ')':
        lastPair = stack.pop()
        stack.pop()  # Pop '('.
      else:  # e == '0' or e == '1'
        # Store the '0' or '1'. The cost to change their values is just 1,
        # whether it's changing '0' to '1' or '1' to '0'.
        lastPair = (e, 1)
      if stack and stack[-1][0] in '&|':
        op = stack.pop()[0]
        a, costA = stack.pop()
        b, costB = lastPair
        # Determine the cost to toggle op(a, b).
        if op == '&':
          if a == '0' and b == '0':
            # Change '&' to '|' and a|b to '1'.
            lastPair = ('0', 1 + min(costA, costB))
          elif a == '0' and b == '1':
            # Change '&' to '|'.
            lastPair = ('0', 1)
          elif a == '1' and b == '0':
            # Change '&' to '|'.
            lastPair = ('0', 1)
          else:  # a == '1' and b == '1'
            # Change a|b to '0'.
            lastPair = ('1', min(costA, costB))
        else:  # op == '|'
          if a == '0' and b == '0':
            # Change a|b to '1'.
            lastPair = ('0', min(costA, costB))
          elif a == '0' and b == '1':
            # Change '|' to '&'.
            lastPair = ('1', 1)
          elif a == '1' and b == '0':
            # Change '|' to '&'.
            lastPair = ('1', 1)
          else:  # a == '1' and b == '1'
            # Change '|' to '&' and a|b to '0'.
            lastPair = ('1', 1 + min(costA, costB))
      stack.append(lastPair)

    return stack[-1][1]
