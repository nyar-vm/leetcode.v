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
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        if valueDiff < 0 or indexDiff < 0:
            return False
        width = valueDiff + 1
        buckets = {}
        for i, num in enumerate(nums):
            bucket_id = num // width
            # Check current bucket
            if bucket_id in buckets:
                prev_num, prev_i = buckets[bucket_id]
                if abs(num - prev_num) <= valueDiff and (i - prev_i) <= indexDiff:
                    return True
            # Check left bucket
            if (bucket_id - 1) in buckets:
                prev_num, prev_i = buckets[bucket_id - 1]
                if abs(num - prev_num) <= valueDiff and (i - prev_i) <= indexDiff:
                    return True
            # Check right bucket
            if (bucket_id + 1) in buckets:
                prev_num, prev_i = buckets[bucket_id + 1]
                if abs(num - prev_num) <= valueDiff and (i - prev_i) <= indexDiff:
                    return True
            # Update the current bucket with current number and index
            buckets[bucket_id] = (num, i)
            # Remove elements out of the window, but since we process in order, only keep the latest in each bucket
            # Older elements in the same bucket will be overwritten, and their indices are too old for future checks
        return False
