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

class Solution:
    def getMaxGridHappiness(self, m: int, n: int, introvertsCount: int, extrovertsCount: int) -> int:
        from functools import lru_cache

        @lru_cache(maxsize=None)
        def dfs(row, col, prev_row, current_prefix, intro_left, extro_left):
            if row == m:
                return 0
            if col == n:
                return dfs(row + 1, 0, current_prefix, 0, intro_left, extro_left)
            
            max_happiness = 0
            for type_c in [0, 1, 2]:
                if type_c == 1 and intro_left < 1:
                    continue
                if type_c == 2 and extro_left < 1:
                    continue

                contribution = 0
                if type_c != 0:
                    base = 120 if type_c == 1 else 40
                    contribution += base

                    # Calculate contribution from left neighbor
                    if col > 0:
                        left_val = current_prefix % 3
                        if left_val != 0:
                            # Left exists, so calculate interaction
                            left_adj = -30 if left_val == 1 else 20
                            current_adj = -30 if type_c == 1 else 20
                            contribution += (left_adj + current_adj)
                    
                    # Calculate contribution from top neighbor
                    top_val = (prev_row // (3 ** col)) % 3
                    if top_val != 0:
                        # Top exists
                        top_adj = -30 if top_val == 1 else 20
                        current_adj_t = -30 if type_c == 1 else 20
                        contribution += (top_adj + current_adj_t)
                
                new_prefix = current_prefix * 3 + type_c
                new_intro = intro_left - (1 if type_c == 1 else 0)
                new_extro = extro_left - (1 if type_c == 2 else 0)

                if col < n - 1:
                    next_call = dfs(row, col + 1, prev_row, new_prefix, new_intro, new_extro)
                else:
                    next_call = dfs(row + 1, 0, new_prefix, 0, new_intro, new_extro)

                current_total = contribution + next_call
                if current_total > max_happiness:
                    max_happiness = current_total

            return max_happiness

        return dfs(0, 0, 0, 0, introvertsCount, extrovertsCount)
