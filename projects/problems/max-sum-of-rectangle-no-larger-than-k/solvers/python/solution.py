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
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        m = len(matrix)
        n = len(matrix[0])
        
        # Transpose the matrix if the number of rows is larger to minimize the outer loop
        if m > n:
            matrix = list(map(list, zip(*matrix)))  # transpose
            m, n = n, m
        
        # Precompute the prefix sums for each row
        prefix_rows = []
        for row in matrix:
            curr = [0]
            s = 0
            for num in row:
                s += num
                curr.append(s)
            prefix_rows.append(curr)
        
        max_total = -float('inf')
        
        # Iterate over all possible left and right column pairs
        for left in range(n):
            for right in range(left, n):
                # Compute the row_sums array for the current column range [left, right]
                row_sums = []
                for r in range(m):
                    current_sum = prefix_rows[r][right + 1] - prefix_rows[r][left]
                    row_sums.append(current_sum)
                
                # Find the maximum subarray sum <=k in row_sums
                current_max = self.compute_max_subarray(row_sums, k)
                if current_max > max_total:
                    max_total = current_max
                    if max_total == k:  # Early exit if we find exactly k
                        return k
        
        return max_total
    
    def compute_max_subarray(self, arr: List[int], k: int) -> int:
        sorted_prefix = [0]
        max_sum = -float('inf')
        current_prefix = 0
        
        for num in arr:
            current_prefix += num
            # Find the smallest element in sorted_prefix >= current_prefix - k
            target = current_prefix - k
            idx = bisect.bisect_left(sorted_prefix, target)
            if idx < len(sorted_prefix):
                candidate = current_prefix - sorted_prefix[idx]
                if candidate > max_sum:
                    max_sum = candidate
            # Insert the current prefix into the sorted list
            ins_pos = bisect.bisect_left(sorted_prefix, current_prefix)
            sorted_prefix.insert(ins_pos, current_prefix)
        
        return max_sum
