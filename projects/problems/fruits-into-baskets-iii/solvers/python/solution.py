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

mn = int(1e10)
class SegmentTree:
    def __init__(self,n):
        # f记录的是特定区间，f[k]，序号为k的点：该节点掌管的索引为l,r，值区间l~r的数字总和
        self.f = [mn for i in range(4*n)]
    
    def update(self,k,l,r,i,x):
        # 序号为k的索引，掌管的范围是l~r
        if l == r:
            self.f[k] = x
            # 叶子节点
            return 
        mid = (l+r)//2
        # 看索引i在左右子树的哪一边。递归更新
        if i <= mid: # 在左子树
            self.update(2*k,l,mid,i,x)
        elif i > mid: # 在右子树
            self.update(2*k+1,mid+1,r,i,x)
        self.f[k] = min(self.f[2*k],self.f[2*k+1])
    
    def query(self,k,l,r,start,end):
        # start~end始终是l~r的子区间
        # 序号为k的索引，掌管的范围是l~r
        # 在整棵树上进行搜寻 start~end 索引所汇总的范围和
        if l == start and r == end:
            return self.f[k]
        mid = (l+r)//2
        if end <= mid: # 如果start~end完全在左半边，则只需要算左子树
            return self.query(2*k,l,mid,start,end)
        if mid < start: # 如果start~end完全在右半边，则只需要算右子树
            return self.query(2*k+1,mid+1,r,start,end)
        # 否则，需要同时考虑左右孩子
        leftPart = self.query(2*k,l,mid,start,mid) # 注意：在这里最后一个参数是mid而不是end
        rightPart = self.query(2*k+1,mid+1,r,mid+1,end) # 注意：在这里倒数第二个参数是mid+1而不是start
        # 因为：# start~end始终是l~r的子区间，否则递归会没有出口
        return min(leftPart,rightPart)

class Solution:
    def numOfUnplacedFruits(self, fruits: List[int], baskets: List[int]) -> int:
        '''
        离散化 + 线段树
        '''
        n = len(fruits)
        # 离散化
        arr = set(fruits + baskets)
        dt = {}
        arr = sorted(list(arr))
        for i,num in enumerate(arr):
            dt[num] = i

        # init
        tree = SegmentTree(len(arr))
        # 相同 baskets[j] 的值对应的下标队列
        pos = defaultdict(deque)
        for i,num in enumerate(baskets):
            if num not in pos:
                tree.update(1,0,len(arr)-1,dt[num],i)
                
            pos[num].append(i)

        res = 0
        for num in fruits:
            # 查询[num,∞） 的最小下标，离散化后对应 [ dt[num],len(arr)-1 ]
            j = tree.query(1,0,len(arr)-1,dt[num],len(arr)-1)
            # 找不到对应下标
            if j == mn:
                res += 1
                continue

            
            tmp = baskets[j]
            pos[tmp].popleft()
            # 若存在，baskets[j] 对应的下一个下标，则单点更新
            if pos[tmp]:
                tree.update(1,0,len(arr)-1,dt[tmp],pos[tmp][0])
            # 若不存在，就更新为一个较大值 mn
            else:
                tree.update(1,0,len(arr)-1,dt[tmp],mn)
        
        return res
