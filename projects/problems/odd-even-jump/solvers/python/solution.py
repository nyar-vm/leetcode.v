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

import bisect
from typing import List

class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        n = len(arr)
        higher = [-1] * n
        lower = [-1] * n
        
        sorted_list = []  # Sorted by (value, index)
        
        for i in range(n-1, -1, -1):
            current_val = arr[i]
            current_idx = i
            
            # Compute higher[i]
            # Find the first element with value >= current_val
            pos_high = bisect.bisect_left(sorted_list, (current_val, -float('inf')))
            if pos_high < len(sorted_list):
                higher[i] = sorted_list[pos_high][1]
            else:
                higher[i] = -1
                
            # Compute lower[i]
            # Find the largest value <= current_val
            pos_low = bisect.bisect_right(sorted_list, (current_val, float('inf'))) - 1
            if pos_low >= 0:
                v_max = sorted_list[pos_low][0]
                # Find the first occurrence of v_max to get the smallest index
                left_pos = bisect.bisect_left(sorted_list, (v_max, -float('inf')))
                lower[i] = sorted_list[left_pos][1]
            else:
                lower[i] = -1
                
            # Insert current element into the sorted list
            insert_pos = bisect.bisect_left(sorted_list, (current_val, current_idx))
            sorted_list.insert(insert_pos, (current_val, current_idx))
        
        # Dynamic Programming to determine good starting indices
        dp_odd = [False] * n
        dp_even = [False] * n
        dp_odd[-1] = True
        dp_even[-1] = True
        
        for i in range(n-2, -1, -1):
            # Compute dp_odd[i]: next jump is odd, so look at higher[i]
            if higher[i] != -1:
                dp_odd[i] = dp_even[higher[i]]
            else:
                dp_odd[i] = False
            # Compute dp_even[i]: next jump is even, so look at lower[i]
            if lower[i] != -1:
                dp_even[i] = dp_odd[lower[i]]
            else:
                dp_even[i] = False
        
        return sum(dp_odd)
