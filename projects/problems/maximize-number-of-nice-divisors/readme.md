# Maximize Number Of Nice Divisors

- **LeetCode**：[#1808 Maximize Number Of Nice Divisors](https://leetcode.com/problems/maximize-number-of-nice-divisors/)
- **难度**：Hard
- **标签**：Recursion · Math · Number Theory

## 题目

You are given a positive integer primeFactors. You are asked to construct a positive integer n that satisfies the following conditions:\r
\r
\r
The number of prime factors of n (not necessarily distinct) is at most primeFactors.\r
The number of nice divisors of n is maximized. Note that a divisor of n is nice if it is divisible by every prime factor of n. For example, if n = 12, then its prime factors are [2,2,3], then 6 and 12 are nice divisors, while 3 and 4 are not.\r
\r
\r
Return the number of nice divisors of n. Since that number can be too large, return it modulo 109 + 7.\r
\r
Note that a prime number is a natural number greater than 1 that is not a product of two smaller natural numbers. The prime factors of a number n is a list of prime numbers such that their product equals n.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：primeFactors = 5\r
**Output**：6\r
**Explanation**：200 is a valid value of n.\r
It has 5 prime factors: [2,2,2,5,5], and it has 6 nice divisors: [10,20,40,50,100,200].\r
There is not other value of n that has at most 5 prime factors and more nice divisors.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：primeFactors = 8\r
**Output**：18\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 <= primeFactors $\le 109$\r
