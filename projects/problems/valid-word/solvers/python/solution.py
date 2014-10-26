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
    def isValid(self, word: str) -> bool:
        if len(word) < 3:
            return False
        has_vowel = has_consonant = False
        vs = set("aeiouAEIOU")
        for c in word:
            if not c.isalnum():
                return False
            if c.isalpha():
                if c in vs:
                    has_vowel = True
                else:
                    has_consonant = True
        return has_vowel and has_consonant
