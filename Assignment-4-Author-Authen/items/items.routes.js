const express = require('express');
const globalMiddleware = require('../middleware/global.middleware');
const itemsController = require('./items.controller')
const itemsRoute = express.Router();

// Middleware to authenticate the user
itemsRoute.use(globalMiddleware.authenticateUser);

// Get All Items (Admin and Other User)
itemsRoute.get('/', itemsController.retrieveAll);

// Get One Item (Admin and Other User)
itemsRoute.get('/:id', itemsController.retrieveOne);

// Create an Item (Admin Privilege Only)
itemsRoute.post('/',
    globalMiddleware.checkAdminRole,
    itemsController.createItem
);

// Update an Item Using PUT (Admin Privilege Only)
itemsRoute.put('/:id',
    globalMiddleware.checkAdminRole,
    itemsController.updateItemPut
);

// Update an Item Using PATCH (Admin Privilege Only)
itemsRoute.patch('/:id',
    globalMiddleware.checkAdminRole,
    itemsController.updateItemPatch
);

// Delete an Item (Admin Privilege Only)
itemsRoute.delete('/:id',
    globalMiddleware.checkAdminRole,
    itemsController.deleteItem
);

module.exports = itemsRoute;