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
    def mergeStones(self, stones: List[int], k: int) -> int:
        n = len(stones)
        if (n - 1) % (k - 1) != 0:
            return -1
        
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stones[i]
        
        INF = float('inf')
        # Initialize DP table: dp[i][j][m]
        dp = [[[INF] * (n + 1) for _ in range(n)] for __ in range(n)]
        
        for i in range(n):
            dp[i][i][1] = 0
        
        for l in range(2, n + 1):
            for i in range(n - l + 1):
                j = i + l - 1
                current_sum = prefix[j + 1] - prefix[i]
                
                for m in range(2, l + 1):
                    if (l - m) % (k - 1) != 0:
                        continue
                    min_cost = INF
                    for mid in range(i, j):
                        for m1 in range(1, m):
                            m2 = m - m1
                            left_len = mid - i + 1
                            right_len = j - mid
                            if (left_len - m1) % (k - 1) != 0 or (right_len - m2) % (k - 1) != 0:
                                continue
                            cost = dp[i][mid][m1] + dp[mid + 1][j][m2]
                            if cost < min_cost:
                                min_cost = cost
                    if min_cost != INF:
                        dp[i][j][m] = min_cost
                
                # Handle m=1 after other m's
                if (l - 1) % (k - 1) == 0:
                    m_needed = k
                    if m_needed <= l and dp[i][j][m_needed] != INF:
                        dp[i][j][1] = dp[i][j][m_needed] + current_sum
                else:
                    dp[i][j][1] = INF
        
        return dp[0][n - 1][1] if dp[0][n - 1][1] != INF else -1
