const express = require('express');
const router = express.Router();
const programRouter = require('./programs/program.routes');
const studentRouter = require('./students/students.routes');
const userRouter = require('./users/users.routes');

router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
})

router.use('/programs', programRouter);
router.use('/students', studentRouter);
router.use('/users', userRouter);

module.exports = router;