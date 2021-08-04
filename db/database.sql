CREATE DATABASE e_shop;

--\c into e_shop

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
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
  
 CREATE TABLE cart_items (
   id SERIAL PRIMARY KEY,
   cart_id INTEGER REFERENCES cart (id) NOT NULL,
   product_id INTEGER REFERENCES product (id) NOT NULL,
   quantity INTEGER NOT NULL DEFAULT 1,
   price MONEY NOT NULL
   );
   
CREATE TABLE orders (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users (id) NOT NULL,
   total MONEY NOT NULL,
   date_ordered TIMESTAMP DEFAULT now(),
   shipped bool DEFAULT false,
   date_shipped DATE
   );

CREATE TABLE  orders_item (
   id SERIAL PRIMARY KEY, 
   product_id INTEGER REFERENCES product (id) NOT NULL,
   order_id INTEGER REFERENCES orders (id) NOT NULL,
   quantity INTEGER DEFAULT 1,
   PRICE MONEY NOT NULL
  );
  
 INSERT INTO users 
 VALUES
 	(DEFAULT, 'Sterling', 'Archer', 'sarcher@gmail.com'),
  (DEFAULT, 'John', 'Wayne', 'jw@gmail.com'),
  (DEFAULT, 'Billy', 'The Kid', 'bkid@hotmail.com'),
  (DEFAULT, 'Jimmy', 'Shark', 'jshark@hotmail.com'),
  (DEFAULT, 'Archer', 'Stacey', 'arch@hotmail.com');
  
INSERT INTO product
 VALUES
 	(DEFAULT, 'Snuggie', 'The original Snuggie - the blanket with sleeves!', 19.99),
  (DEFAULT, 'Quick Chop', 'The Quick Chop chops, minces, slices, dices with just a tap!', 19.95),
  (DEFAULT, 'Chia Pet', 'Collecting and growing Chia Pet pottery planters has become an American tradition.', 19.99);
  
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
  
INSERT INTO orders
VALUES
  (DEFAULT, 1, 99.99),
  (DEFAULT, 1, 59.99),
  (DEFAULT, 1, 9.99),
  (DEFAULT, 3, 1000.00);

INSERT INTO orders_item (product_id, order_id, quantity, price)
VALUES
  (1, 1, DEFAULT, 9.99),
  (2, 1, DEFAULT, 9.99),
  (3, 2, DEFAULT, 9.99),
  (1, 2, DEFAULT, 9.99),
  (1, 3, DEFAULT, 9.99);
