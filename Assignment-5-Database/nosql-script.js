// 3 (a) => CREATION OF ALL THE ENTITIES NoSQL Approach

// Create Users Collection
db.createCollection("users");

// Create Admin Collection
db.createCollection("admin");

// Create Categories Collection
db.createCollection("categories");

// Create Items Collection
db.createCollection("items");

// Create Orders Collection
db.createCollection("orders");

// Create Order_Items Collection
db.createCollection("order_items");


// 3 (b) => COMMANDS FOR INSERTING RECORDS

// Insert into Users Collection
db.users.insert({
    _id: 1,
    name: "Otavie Okuoyo",
    email: "otavieokuoyo@gmail.com",
    password: "password123",
    gender: "Male",
    contact: "12th Street"
});

// Insert into Admin Collection
db.admin.insert({
    _id: 1,
    role: 'Admin',
    user_id: 1
});

// Insert into Categories Collection
db.categories.insert({
    _id: 1,
    name: "Electronics"
});

// Insert into the Items Collection
db.items.insert({
    _id: 1,
    name: "Apple X",
    price: 599.99,
    size: "Medium",
    category_id: 1
});

// Insert into Order Collection
db.orders.insert({
    _id: 1,
    user_id: 1,
    date: ISODate("2023-09-15T00:00:00Z"),
    status: "Pending"
});

// Insert into the Order_Items Collection
db.order_items.insert({
    _id: 1,
    order_id: 1,
    item_id: 1,
    quantity: 2
});

// 3 (c) - Get All Records from Users Collection
db.users

// 3 (c) - Get All Items that are Electronics
db.items.aggregate([
    {
        $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category"
        }
    },
    {
        $match: {
            "category.name": "Electronics"
        }
    },
    {
        $project: {
            _id: 0, // Exclude _id field from the result
            name: 1, // Include the name field in the result
            price: 1 //Include the price field in the result
        }
    }
]);

// 3 (d) - Update a Record from admin Collection
db.admin.updateOne(
    { _id: 1 },
    { $set: { role: 'Super Admin' } }
);

// 3 (d) Update a Record from items Collection
db.items.updateOne(
    { _id: 1 },
    { $set: {price: 649.99} }
);

// 3 (e) Delete a Record from users collection
db.users.deleteOne({ _id: 1 });

// 3 (e) Delete a Record from items Collection
db.items.deleteOne({ _id: 1 })