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

class Solution:
    def getBiggestThree(self, grid: List[List[int]]) -> List[int]:
        m = len(grid)
        n = len(grid[0]) if m > 0 else 0
        all_sums = set()
        
        for i in range(m):
            for j in range(n):
                # Calculate the maximum possible k for current center (i,j)
                max_k = min(i, (m - 1 - i), j, (n - 1 - j))
                for k in range(0, max_k + 1):
                    if k == 0:
                        all_sums.add(grid[i][j])
                    else:
                        points = set()
                        # Edge1: from (i -k, j) to (i, j +k)
                        for t in range(0, k + 1):
                            x = i - k + t
                            y = j + t
                            points.add((x, y))
                        # Edge2: from (i, j +k) to (i +k, j)
                        for t in range(0, k + 1):
                            x = i + t
                            y = j + k - t
                            points.add((x, y))
                        # Edge3: from (i +k, j) to (i, j -k)
                        for t in range(0, k + 1):
                            x = i + k - t
                            y = j - t
                            points.add((x, y))
                        # Edge4: from (i, j -k) to (i -k, j)
                        for t in range(0, k + 1):
                            x = i - t
                            y = j - k + t
                            points.add((x, y))
                        # Calculate the sum for this rhombus
                        current_sum = 0
                        for (x, y) in points:
                            current_sum += grid[x][y]
                        all_sums.add(current_sum)
        
        # Convert to a sorted list in descending order
        sorted_sums = sorted(all_sums, reverse=True)
        result = []
        for num in sorted_sums:
            if len(result) < 3:
                result.append(num)
            else:
                break
        return result
