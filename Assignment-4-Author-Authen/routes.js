const express = require('express');
const router = express.Router();
const itemsRouter = require('./items/items.routes');
const usersRouter = require('./users/users.routes');
const itemsMiddleware = require('./items/items.middleware')

// Middleware to Read Items From JSON File
router.use(itemsMiddleware.readItemsFromFile);

router.use('/items', itemsRouter);
router.use('/users', usersRouter);

module.exports = router;