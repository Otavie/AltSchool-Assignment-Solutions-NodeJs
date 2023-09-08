const express = require('express');
const middleware = require('./program.middleware');
const controller = require('./program.controller');
const programRoutes = express.Router();

programRoutes.get('/', middleware.checkBody, controller.getPrograms);

const programs = [
    {
        id: 1,
        name: 'nodejs',
        amount: 10
    },
    {
        id: 2,
        name: 'python',
        amount: 10
    }
]

module.exports = programRoutes;