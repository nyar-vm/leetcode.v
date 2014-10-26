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
  def largestPalindrome(self, n: int, k: int) -> str:
    match k:
      case 1:
        return '9' * n
      case 2:
        return '8' * n if n <= 2 else '8' + '9' * (n - 2) + '8'
      case 3 | 9:
        return '9' * n
      case 4:
        return '8' * n if n <= 4 else '88' + '9' * (n - 4) + '88'
      case 5:
        return '5' * n if n <= 2 else '5' + '9' * (n - 2) + '5'
      case 6:
        if n <= 2:
          return '6' * n
        elif n % 2 == 1:
          l = n // 2 - 1
          return '8' + '9' * l + '8' + '9' * l + '8'
        else:
          l = n // 2 - 2
          return '8' + '9' * l + '77' + '9' * l + '8'
      case 8:
        return '8' * n if n <= 6 else '888' + '9' * (n - 6) + '888'
      case _:
        middle = {
            0: '', 1: '7', 2: '77', 3: '959', 4: '9779', 5: '99799',
            6: '999999', 7: '9994999', 8: '99944999', 9: '999969999',
            10: '9999449999', 11: '99999499999'
        }
        q, r = divmod(n, 12)
        return '999999' * q + middle[r] + '999999' * q
