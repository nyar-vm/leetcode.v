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
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        # 找起点 (si, sj)
        si, sj = next((i, j) for i in range(m) for j in range(n) if grid[i][j] == '@')
        # 统计钥匙数量
        k = sum(v.islower() for row in grid for v in row)
        dirs = (-1, 0, 1, 0, -1)
        q = deque([(si, sj, 0)])
        vis = {(si, sj, 0)}
        ans = 0
        while q:
            for _ in range(len(q)):
                i, j, state = q.popleft()
                # 找到所有钥匙，返回当前步数
                if state == (1 << k) - 1:
                    return ans

                # 往四个方向搜索
                for a, b in pairwise(dirs):
                    x, y = i + a, j + b
                    nxt = state
                    # 在边界范围内
                    if 0 <= x < m and 0 <= y < n:
                        c = grid[x][y]
                        # 是墙，或者是锁，但此时没有对应的钥匙，无法通过
                        if (
                            c == '#'
                            or c.isupper()
                            and (state & (1 << (ord(c) - ord('A')))) == 0
                        ):
                            continue
                        # 是钥匙
                        if c.islower():
                            # 更新状态
                            nxt |= 1 << (ord(c) - ord('a'))
                        # 此状态未访问过，入队
                        if (x, y, nxt) not in vis:
                            vis.add((x, y, nxt))
                            q.append((x, y, nxt))
            # 步数加一
            ans += 1
        return -1
