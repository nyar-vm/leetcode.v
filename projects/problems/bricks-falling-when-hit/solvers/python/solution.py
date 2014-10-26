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
    def hitBricks(self, grid: List[List[int]], hits: List[List[int]]) -> List[int]:
        m = len(grid)
        if m == 0:
            return []
        n = len(grid[0])
        n_cols = n
        virtual = m * n
        grid_copy = [row[:] for row in grid]
        is_brick = [False] * len(hits)
        
        for i in range(len(hits)):
            x, y = hits[i]
            if grid[x][y] == 1:
                is_brick[i] = True
                grid_copy[x][y] = 0  # Mark the hit as removed initially
        
        # DSU class definition
        class DSU:
            def __init__(self, size):
                self.parent = list(range(size + 1))
                self.size = [1] * (size + 1)
            
            def find(self, x):
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]
            
            def union(self, x, y):
                x_root = self.find(x)
                y_root = self.find(y)
                if x_root == y_root:
                    return
                if self.size[x_root] < self.size[y_root]:
                    x_root, y_root = y_root, x_root
                self.parent[y_root] = x_root
                self.size[x_root] += self.size[y_root]
        
        dsu = DSU(m * n)
        
        # Initialize the DSU based on the modified grid (grid_copy)
        for i in range(m):
            for j in range(n):
                if grid_copy[i][j] == 1:
                    current = i * n_cols + j
                    if i == 0:
                        dsu.union(current, virtual)
                    # Check left
                    if j > 0 and grid_copy[i][j - 1] == 1:
                        left = current - 1
                        dsu.union(current, left)
                    # Check above
                    if i > 0 and grid_copy[i - 1][j] == 1:
                        above = (i - 1) * n_cols + j
                        dsu.union(current, above)
        
        res = []
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        for idx in reversed(range(len(hits))):
            hit = hits[idx]
            x, y = hit
            if not is_brick[idx]:
                res.append(0)
                continue
            cell_id = x * n_cols + y
            grid_copy[x][y] = 1  # Re-add the brick
            
            initial_size = dsu.size[dsu.find(virtual)]
            
            current = cell_id
            # Union with the virtual node if in the first row
            if x == 0:
                dsu.union(current, virtual)
            
            # Check all four directions
            for dx, dy in directions:
                nx = x + dx
                ny = y + dy
                if 0 <= nx < m and 0 <= ny < n:
                    if grid_copy[nx][ny] == 1:
                        neighbor_id = nx * n_cols + ny
                        dsu.union(current, neighbor_id)
            
            final_size = dsu.size[dsu.find(virtual)]
            delta = final_size - initial_size
            cnt = delta - 1 if delta > 0 else 0
            res.append(cnt)
        
        # Reverse the result to match the original hits order
        return res[::-1]
