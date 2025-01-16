-- order by
-- use customertable

SELECT contactLastName, contactFirstName FROM customers ORDER by contactLastName


SELECT contactLastName, contactFirstName 
FROM customers 
ORDER BY 
contactLastName DESC, contactFirstName ASC;

---

Order by orderDetails 

-- calculate the subtotal for each line item and sort the result set based on the subtotal

SELECT 
    orderNumber,
    orderLineNumber,
    quantityOrdered * priceEach as subtotal
FROM 
    orderdetails
ORDER BY
    subtotal DESC;


--- 
SELECT 
    orderNumber,
    status
FROM
    orders
ORDER BY
    FIELD( status,
    'In Process',
    'On Hold',
    'Cancelled',
    'Resolved',
    'Disputed',
    'Shipped');


-- Find order that have total amount greater than 1000 .....

SELECT
    ordernumber,
    SUM(quantityOrdered) AS itemCount,
    SUM(priceEach * quantityOrdered) AS total
FROM
    orderdetails
GROUP BY ordernumber
HAVING 
    total > 1000 AND itemCount > 600

-- 

SELECT 
    product_name,
    COUNT(id)
FROM
    sales
GROUP BY 
    product_name
HAVING
    count(id) = 1


--

SELECT 
    productLine, 
    SUM(orderValue ) totalOrderValue,
    orderYear
FROM 
    sales
GROUP BY 
    productline, orderYear WITH ROLLUP;

productLine     totalOrderValue     orderyear

BIKES           2b                  2023
bike            1b                  2024
Cars            2b
EV Vehicle      1.2 b 


----

query 1  -> result set 
    query -> result set -> final resulst

SELECT 
    lastName, firstName
FROM
    employees
WHERE
    officeCode in (SELECT officeCode FROM offices where country = 'USA');


SELECT 
    customerName
FROM
    customers
WHERE
    customerNumber NOT IN (SELECT DISTINCT customerNumber FROM orders);