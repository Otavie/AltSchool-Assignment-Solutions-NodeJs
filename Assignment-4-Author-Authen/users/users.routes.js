const express = require('express');
const usersController = require('./users.controller');
const usersMiddleware = require('./users.middleware');
const usersRoute = express.Router();

// Register a New User
usersRoute.post('/register',
    usersMiddleware.validateUserCreation,
    usersController.registerUser
);

module.exports = usersRoute;