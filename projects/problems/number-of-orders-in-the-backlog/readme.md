# Number Of Orders In The Backlog

- **LeetCode**：[#1801 Number Of Orders In The Backlog](https://leetcode.com/problems/number-of-orders-in-the-backlog/)
- **难度**：Medium
- **标签**：Array · Simulation · Heap (Priority Queue)

## 题目

You are given a 2D integer array orders, where each orders[i] = [pricei, amounti, orderTypei] denotes that amounti orders have been placed of type orderTypei at the price pricei. The orderTypei is:\r
\r
\r
0 if it is a batch of buy orders, or\r
1 if it is a batch of sell orders.\r
\r
\r
Note that orders[i] represents a batch of amounti independent orders with the same price and order type. All orders represented by orders[i] will be placed before all orders represented by orders[i+1] for all valid i.\r
\r
There is a backlog that consists of orders that have not been executed. The backlog is initially empty. When an order is placed, the following happens:\r
\r
\r
If the order is a buy order, you look at the sell order with the smallest price in the backlog. If that sell order's price is smaller than or equal to the current buy order's price, they will match and be executed, and that sell order will be removed from the backlog. Else, the buy order is added to the backlog.\r
Vice versa, if the order is a sell order, you look at the buy order with the largest price in the backlog. If that buy order's price is larger than or equal to the current sell order's price, they will match and be executed, and that buy order will be removed from the backlog. Else, the sell order is added to the backlog.\r
\r
\r
Return the total amount of orders in the backlog after placing all the orders from the input. Since this number can be large, return it modulo 109 + 7.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]\r
**Output**：6\r
**Explanation**：Here is what happens with the orders:\r
- 5 orders of type buy with price 10 are placed. There are no sell orders, so the 5 orders are added to the backlog.\r
- 2 orders of type sell with price 15 are placed. There are no buy orders with prices larger than or equal to 15, so the 2 orders are added to the backlog.\r
- 1 order of type sell with price 25 is placed. There are no buy orders with prices larger than or equal to 25 in the backlog, so this order is added to the backlog.\r
- 4 orders of type buy with price 30 are placed. The first 2 orders are matched with the 2 sell orders of the least price, which is 15 and these 2 sell orders are removed from the backlog. The 3rd order is matched with the sell order of the least price, which is 25 and this sell order is removed from the backlog. Then, there are no more sell orders in the backlog, so the 4th order is added to the backlog.\r
Finally, the backlog has 5 buy orders with price 10, and 1 buy order with price 30. So the total number of orders in the backlog is 6.\r
\r
\r
**Example 2**：\r
\r
\r
**Input**：orders = [[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]]\r
**Output**：999999984\r
**Explanation**：Here is what happens with the orders:\r
- 109 orders of type sell with price 7 are placed. There are no buy orders, so the 109 orders are added to the backlog.\r
- 3 orders of type buy with price 15 are placed. They are matched with the 3 sell orders with the least price which is 7, and those 3 sell orders are removed from the backlog.\r
- 999999995 orders of type buy with price 5 are placed. The least price of a sell order is 7, so the 999999995 orders are added to the backlog.\r
- 1 order of type sell with price 5 is placed. It is matched with the buy order of the highest price, which is 5, and that buy order is removed from the backlog.\r
Finally, the backlog has (1000000000-3) sell orders with price 7, and (999999995-1) buy orders with price 5. So the total number of orders = 1999999991, which is equal to 999999984 % (109 + 7).\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(orders)$ $\le 105$\r
orders[i].length == 3\r
1 <= pricei, amounti $\le 109$\r
orderTypei is either 0 or 1.\r
