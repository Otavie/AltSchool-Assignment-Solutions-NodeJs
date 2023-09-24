# INVENTORY MANAGEMENT SYSTEM DATABASE

This repository contains the database design and SQL/NoSQL scripts for the Inventory Management System project as requested by Company X. The project aims to create a robust inventory management system allowing administrators to manage items, categories, and orders while users can view items and place orders.

## Entity Relationship Diagram (ERD)

To view the ERD for this database design, please visit the [ERD Diagram](https://drawsql.app/teams/otavie/diagrams/assignment-x) for a visual representation of the entity relationships.

## SQL Database

### Database Schema

We have designed a relational database using SQL to store information about items, categories, users, orders, and order items. Here's an overview of the tables:

- **Users**: Stores information about users, including administrators and regular users.

- **Categories**: Contains details of item categories.

- **Items**: Stores information about items, including name, price, size, and category.

- **Orders**: Records orders placed by users, including order status.

- **Order_Items**: Represents the relationship between orders and items, tracking ordered quantities.

- **Admin**: Contains records about various admins and their respective roles.

### SQL Scripts

- **[sql-script.sql](sql-script.sql):** This file contains the SQL script for:
  - creating the database and tables.
  - inserting sample records into the tables.
  - retrieving records from two or more entities.
  - updating records from two or more entities.
  - deleting records from two or more entities.

## NoSQL Database (MongoDB)

### Database Schema

For NoSQL, we are using MongoDB to represent the data in a more flexible, document-based structure.

- **Users**: MongoDB collection to store user information.

- **Categories**: MongoDB collection for item categories.

- **Items**: MongoDB collection to store item details, including category references.

- **Orders**: MongoDB collection to record orders with user and item details.

- **Admin**: MongoDB collection to store various admins and their respective roles.

### NoSQL Scripts

- **[nosql-script.js](nosql-script.js)**: This file contains the script for:
  - creating the MongoDB database and collections.
  - inserting sample records into MongoDB collections.
  - retrieving records from two or more collections.
  - updating records from two or more collections
  - deleting records from two or more collections.

## Usage

1. For NoSQL, execute the respective scripts for creating and populating the MongoDB collections.

2. Use the provided SQL and NoSQL scripts to perform various operations as needed for your project.

## ERD Tool

You can view the Entity Relationship Diagram [here](https://drawsql.app/teams/otavie/diagrams/assignment-x).

For any questions or assistance, please contact Otavie Okuoyo at otavieokuoyo@gmail.com.
