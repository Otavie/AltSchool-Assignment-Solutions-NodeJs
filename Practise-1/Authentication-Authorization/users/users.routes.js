const express = require('express');
const middleware = require('./users.middleware');
const controller = require('./users.controller');
const userRoutes = express.Router();

// Create a User
userRoutes.post('/', middleware.validateUserCreation, controller.createUser);

module.exports = userRoutes;