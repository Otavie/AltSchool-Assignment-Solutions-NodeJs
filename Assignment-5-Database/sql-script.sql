-- 2 (a) => CREATION OF ALL THE ENTITIES SQL Approach

-- Create Users Tables
CREATE TABLE users (
    id INT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender ENUM('Male', 'Female'),
    contact VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create Admin Tables
CREATE TABLE admin (
    id INT NOT NULL,
    role VARCHAR(255),
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    PRIMARY KEY (id)
);

-- Create Category Table
CREATE TABLE categories (
    id INT NOT NULL,
    name VARCHAR(255),
    item_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create Items Table
CREATE TABLE items (
    id INT NOT NULL, 
    name VARCHAR(255),
    price DECIMAL(10, 2),
    size ENUM('Small', 'Medium', 'Large'),
    category_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (id)
);

-- Create Order Table
CREATE TABLE orders (
    id INT NOT NULL,
    user_id INT,
    date Date,
    status ENUM('Approved', 'Disapproved', 'Pending'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

-- Create Order_Items Junction Table
CREATE TABLE order_items (
    id INT NOT NULL,
    order_id INT,
    item_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id),
    PRIMARY KEY (id)
)

-- 2 (b) => COMMANDS FOR INSERTING RECORDS

-- Insert into Users Table
INSERT INTO users (id, name, email, password, gender, contact)
VALUES (1, 'Otavie Okuoyo', 'otavie.okuoyo@gmail.com', 'password123', 'Male', '12th Street');

-- Insert into Admin Table
INSERT INTO admin (id, role, user_id)
VALUES (1, 'Admin', '2');

-- Insert into Categories Table
INSERT INTO categories (id, name)
VALUES (1, 'Electronics');

-- Insert into Items Table
INSERT INTO items (id, name, price, size, category_id)
VALUES (1, 'iPhone X', 599.99, 'Medium', 1);

-- Insert into Order_Items Table
INSERT INTO order_items (id, order_id, item_id, quantity)
VALUES (1, 1, 1, 2);

-- 2 (c) Get Records from Users and Orders Tables 
SELECT users.name AS user_name, orders.status
FROM users
JOIN orders ON users.id = orders.user_id;

-- 2 (d)
-- Update a Record in Admin Table
UPDATE admin
SET role = 'Super Admin'
WHERE id = 1;

-- Update a Record in Items Table
UPDATE items 
SET price = 649.99
where id = 1;

-- 2 (e)
-- Delete a Record from Categories Table 
DELETE FROM categories
WHERE id = 1;

-- Delete a Record fro Order Table
DELETE FROM orders
WHERE id = 1;