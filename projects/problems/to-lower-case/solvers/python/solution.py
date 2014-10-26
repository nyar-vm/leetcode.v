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

class Solution:
    def toLowerCase(self, s: str) -> str:
        return "".join([chr(ord(c) | 32) if c.isupper() else c for c in s])
