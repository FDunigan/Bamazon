DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INTEGER(20),
  stock_quantity INTEGER(20),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Cellular", "1000", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Galaxy S8", "Cellular", "800", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Smash Bros", "Gaming", "60", "25");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Gaming", "400", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung LCD 55 inch TV", "Electronics", "600", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blu-ray player", "Electronics", "50", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Equinox comforter", "Bedding", "40", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Equinox bed pillows", "Bedding", "30", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Rooster Bar", "Books", "10", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("All the Light We Cannot See", "Books", "15", "20");