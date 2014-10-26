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
    def minArraySum(self, nums: List[int], k: int, op1: int, op2: int) -> int:
        def get_options(x: int, k_val: int) -> List[tuple]:
            options = []
            # Option0: do nothing
            options.append((0, 0, x))
            # Option1: apply Op1
            v1 = (x + 1) // 2
            options.append((1, 0, v1))
            # Option2: apply Op2 if possible
            if x >= k_val:
                v2 = x - k_val
                options.append((0, 1, v2))
            # PathA: Op1 then Op2 (if possible)
            after_op1 = (x + 1) // 2
            if after_op1 >= k_val:
                valA = after_op1 - k_val
                options.append((1, 1, valA))
            # PathB: Op2 then Op1 (if possible)
            if x >= k_val:
                after_op2 = x - k_val
                valB = (after_op2 + 1) // 2
                options.append((1, 1, valB))
            return options
        
        current_dp = {(op1, op2): 0}
        
        for num in nums:
            next_dp = defaultdict(lambda: float('inf'))
            for (a, b), total in current_dp.items():
                for (c1, c2, val) in get_options(num, k):
                    new_a = a - c1
                    new_b = b - c2
                    if new_a >= 0 and new_b >= 0:
                        if total + val < next_dp[(new_a, new_b)]:
                            next_dp[(new_a, new_b)] = total + val
            current_dp = next_dp
        
        min_sum = float('inf')
        for key in current_dp:
            if current_dp[key] < min_sum:
                min_sum = current_dp[key]
        return min_sum
