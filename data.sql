drop database if exists 
create database bamazon;

use bamazon;

create table products (
id int not null auto_increment,
item_id varchar (100) not null,
product_name varchar (100) not null,
department_name varchar (100) not null,
price decimal (10,2) null,
stock_quantity int default 0,
primary key (id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values ("A0","movie","entertainment",10.50,200), ("B1","game","entertainment",60.00,200), ("C2","fridge","kitchen",299.99,50), ("D3","tv","entertainment",99.95,120), ("E4","couch","furniture",150.00,50), ("F5","bed","furniture",200.00,70), ("G6","pot","kitchen",24.99,100), ("H7","pan","kitchen",29.95,100), ("I8","toothbrush","bathroom",1.99,750), ("J9","comb","bathroom",1.50,750);