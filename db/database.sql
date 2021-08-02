CREATE DATABASE e_shop;

--\c into e_shop

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE
  );
  
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price MONEY
  );
  
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
  );
  
 CREATE TABLE cart_product (
   id SERIAL PRIMARY KEY,
   cart_id INTEGER REFERENCES cart (id),
   product_id INTEGER REFERENCES product (id),
   quantity INTEGER,
   price MONEY
   );
   
 CREATE TABLE "order" (
   id INTEGER PRIMARY KEY,
   cart_id INTEGER REFERENCES cart (id),
   date_submitted DATE,
   date_shipped DATE,
   shipped bool,
   total MONEY
   );
  
 INSERT INTO users 
 VALUES
 	(DEFAULT, 'Sterling', 'Archer', 'sarcher@gmail.com'),
  (DEFAULT, 'John', 'Wayne', 'jw@gmail.com'),
  (DEFAULT, 'Billy', 'The Kid', 'bkid@hotmail.com');
  
INSERT INTO product
 VALUES
 	(1, 'Snuggie', 'Comfy blanket for all uses', 19.99),
  (2, 'Slap Chop', 'Chop them veggies with ease', 59.99),
  (3, 'Chia Pet', 'Grow spices in your kitchen!', 9.99);
  
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