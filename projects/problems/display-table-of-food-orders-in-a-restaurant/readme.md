# Display Table Of Food Orders In A Restaurant

- **LeetCode**：[#1418 Display Table Of Food Orders In A Restaurant](https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant/)
- **难度**：Medium
- **标签**：Array · Hash Table · String · Ordered Set · Sorting

## 题目

Given the array orders, which represents the orders that customers have done in a restaurant. More specifically orders[i]=[customerNamei,tableNumberi,foodItemi] where customerNamei is the name of the customer, tableNumberi is the table customer sit at, and foodItemi is the item customer orders.\r
\r
Return the restaurant's “display table”. The “display table” is a table whose row entries denote how many of each food item each table ordered. The first column is the table number and the remaining columns correspond to each food item in alphabetical order. The first row should be a header whose first column is “Table”, followed by the names of the food items. Note that the customer names are not part of the table. Additionally, the rows should be sorted in numerically increasing order.\r
\r
\r
**Example 1**：\r
\r
\r
**Input**：orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]\r
**Output**：[["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]] \r
**Explanation**：\r
The displaying table looks like:\r
Table,Beef Burrito,Ceviche,Fried Chicken,Water\r
3    ,0           ,2      ,1            ,0\r
5    ,0           ,1      ,0            ,1\r
10   ,1           ,0      ,0            ,0\r
For the table 3: David orders "Ceviche" and "Fried Chicken", and Rous orders "Ceviche".\r
For the table 5: Carla orders "Water" and "Ceviche".\r
For the table 10: Corina orders "Beef Burrito". \r
\r
\r
**Example 2**：\r
\r
\r
**Input**：orders = [["James","12","Fried Chicken"],["Ratesh","12","Fried Chicken"],["Amadeus","12","Fried Chicken"],["Adam","1","Canadian Waffles"],["Brianna","1","Canadian Waffles"]]\r
**Output**：[["Table","Canadian Waffles","Fried Chicken"],["1","2","0"],["12","0","3"]] \r
**Explanation**：\r
For the table 1: Adam and Brianna order "Canadian Waffles".\r
For the table 12: James, Ratesh and Amadeus order "Fried Chicken".\r
\r
\r
**Example 3**：\r
\r
\r
**Input**：orders = [["Laura","2","Bean Burrito"],["Jhon","2","Beef Burrito"],["Melissa","2","Soda"]]\r
**Output**：[["Table","Bean Burrito","Beef Burrito","Soda"],["2","1","1","1"]]\r
\r
\r
\r
**Constraints**：\r
\r
\r
1 $\le \mathrm{len}(orders)$ $\le 5$ * $10^{4}$\r
orders[i].length == 3\r
1 $\le \mathrm{len}(customerNamei)$, foodItemi.length $\le 20$\r
customerNamei and foodItemi consist of lowercase and uppercase English letters and the space character.\r
tableNumberi is a valid integer between 1 and 500.\r
