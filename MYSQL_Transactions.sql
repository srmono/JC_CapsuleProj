TRANSACTION 

Start TRANSACTION
    BEGIN or BEGIN work or start
COMMIT  : apply changes 
ROLLBACK: undo the changes of TRANSACTION 

one or more sql statements that are exeuted as a single unit of work 

Instruct Mysql to not to start TRANSACTION implicitly and commit the changes automatically 

SET autocommit = OFF;   or  SET autocommit = 0;

To enable 

SET autocommit = 1;

SET autocommit = ON;

1. connect to mysql
2. create db 
    create DATABASE banks;

    create TABLE users (
        id INT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255)
    );

3. start a transation that insert a new row into users tables and updates email for the user; 

START TRANSACTION;

INSERT INTO users (id, username) VALUES (1, "venkat"); 

UPDATE users SET email = "bvsrao9!@gmail.com" WHERE id = 1; 

SELECT * FROM users;

COMMIT;

4. ROLLBACK 

START TRANSACTION;

INSERT INTO users (id, username) VALUES (2, "babu"); 

UPDATE users SET email = "babu!@gmail.com" WHERE id = 2; 

SELECT * FROM users;

ROLLBACK;

----

Stored Procedures

user    ->   place  ORDER -> success

update balance in the account 


myqury select * from table where name = "venkat"
