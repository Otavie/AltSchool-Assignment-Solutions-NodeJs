const express = require('express');
const globalMiddleware = require('../middleware/global.middleware');
const studentMiddleware = require('./students.middleware');
const studentController = require('./students.controller');
const studentRoute = express.Router();

studentRoute.use(globalMiddleware.basicAuth);

// Get Students
studentRoute.get('/', studentController.getStudents);

// POST a Student
studentRoute.post('/', 
    globalMiddleware.checkAdmin,
    studentMiddleware.checkProgram,
    studentController.createStudent
);

studentRoute.get('/:id',
    studentController.getOneStudent
)

// Update a Student
studentRoute.patch('/:id', 
    globalMiddleware.checkAdmin,
    studentController.updateStudent
);

// Delete a Student
studentRoute.delete('/:id',
    globalMiddleware.checkAdmin,
    studentController.deleteStudent
)

module.exports = studentRoute;