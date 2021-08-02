CREATE DATABASE e_shop;

--\c into e_shop

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(100),
  typle VARCHAR(50),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
  );
  
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price MONEY NOT NULL
  );
  
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL
  );
  
 CREATE TABLE cart_product (
   id SERIAL PRIMARY KEY,
   cart_id INTEGER REFERENCES cart (id) NOT NULL,
   product_id INTEGER REFERENCES product (id) NOT NULL,
   quantity INTEGER NOT NULL,
   price MONEY NOT NULL
   );
   
 CREATE TABLE "order" (
   id INTEGER PRIMARY KEY,
   cart_id INTEGER REFERENCES cart (id) NOT NULL,
   total MONEY NOT NULL
   date_submitted DATE NOT NULL,
   shipped bool,
   date_shipped DATE,
   );
  
 INSERT INTO users 
 VALUES
 	(DEFAULT, 'Sterling', 'Archer', 'sarcher@gmail.com'),
  (DEFAULT, 'John', 'Wayne', 'jw@gmail.com'),
  (DEFAULT, 'Billy', 'The Kid', 'bkid@hotmail.com');
  
INSERT INTO product
 VALUES
 	(DEFAULT, 'Snuggie', 'Comfy blanket for all uses', 19.99),
  (DEFAULT, 'Slap Chop', 'Chop them veggies with ease', 59.99),
  (DEFAULT, 'Chia Pet', 'Grow spices in your kitchen!', 9.99);
  
INSERT INTO cart
 VALUES
 	(1, 1),
  (2, 1),
  (3, 2);
  
INSERT INTO cart_product
VALUES
	(1, 1, 2, 2, 19.99),
  (2, 1, 2, 2, .99),
  (3, 1, 3, 2, 9.99),
  (4, 2, 1, 1, 9.99);
  
INSERT INTO "order"
VALUES (1, 1, '2021-07-30', '20201-07-31', true);