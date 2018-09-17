# NodeJS-API-Backend
#NodeJS Restful API using MySQL Database 

 please follow given below step to run this project
 
1. Download NodeJS-API-Backend project 

2.open terminal and go to NodeJS-API-Backend folder by typing "cd NodeJS-API-Backend" command

3. run npm install command on terminal 
 
4. run npm start command on terminal, it will start server
 
till now just project got run, now you need to add database in Mysql
please import test.sql file in your localdatabase.

database name 'test'
database include 3 three tables.

1. department(dept_id AutoIncreament PK, dept_name string) . //PK: primary key
2. roles(role_id AutoIncreament PK, role_name string)  //PK: primary key
3. employee(emp_id AutoIncreamn PKt,emp_name string, role_id int, dept_id int)  //PK: primary key

 test all all 4 methods given below

1. Enter New employee details API
createNewEmployee

2. Get All employee details API
getEmployeeDetails

3. Delete Perticular employee record
deleteEmployeeDetails

4.Update employee details
updateEmployeeDetails



