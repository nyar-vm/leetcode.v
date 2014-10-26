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
    def numberOfPatterns(self, m: int, n: int) -> int:
        def dfs(i: int, cnt: int = 1) -> int:
            if cnt > n:
                return 0
            vis[i] = True
            ans = int(cnt >= m)
            for j in range(1, 10):
                x = cross[i][j]
                if not vis[j] and (x == 0 or vis[x]):
                    ans += dfs(j, cnt + 1)
            vis[i] = False
            return ans

        cross = [[0] * 10 for _ in range(10)]
        cross[1][3] = cross[3][1] = 2
        cross[1][7] = cross[7][1] = 4
        cross[1][9] = cross[9][1] = 5
        cross[2][8] = cross[8][2] = 5
        cross[3][7] = cross[7][3] = 5
        cross[3][9] = cross[9][3] = 6
        cross[4][6] = cross[6][4] = 5
        cross[7][9] = cross[9][7] = 8
        vis = [False] * 10
        return dfs(1) * 4 + dfs(2) * 4 + dfs(5)
