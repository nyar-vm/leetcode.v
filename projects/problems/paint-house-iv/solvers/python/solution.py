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

from typing import List
from collections import defaultdict

class Solution:
    def minCost(self, n: int, cost: List[List[int]]) -> int:
        prev_dp = {}
        
        # Initialize for the first pair (i=0)
        first_left = 0
        first_right = n - 1
        for L in [1, 2, 3]:
            for R in [1, 2, 3]:
                if L != R:
                    total = cost[0][L-1] + cost[first_right][R-1]
                    prev_dp[(L, R)] = total
        
        # Process the remaining pairs
        for i in range(1, n//2):
            current_right_pos = n - 1 - i
            curr_dp = defaultdict(lambda: float('inf'))
            for (prev_L, prev_R), prev_cost in prev_dp.items():
                for L in [1, 2, 3]:
                    if L == prev_L:
                        continue
                    for R in [1, 2, 3]:
                        if R == L or R == prev_R:
                            continue
                        # Compute the cost for this transition
                        new_cost = prev_cost + cost[i][L-1] + cost[current_right_pos][R-1]
                        key = (L, R)
                        if new_cost < curr_dp[key]:
                            curr_dp[key] = new_cost
            # Update prev_dp to current_dp, keeping only finite values
            prev_dp = {}
            for k, v in curr_dp.items():
                if v < float('inf'):
                    prev_dp[k] = v
            # Early exit if no possible states (though problem constraints should prevent this)
            if not prev_dp:
                return -1
        
        return min(prev_dp.values()) if prev_dp else 0
