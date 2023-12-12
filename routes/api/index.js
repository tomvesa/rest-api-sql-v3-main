const express = require('express');
const userRouter = require('./user');
const courseRouter = require('./course');

const router = express.Router();

//combine routes together into a single router
router.use('/users', userRouter);
router.use('/courses', courseRouter);

module.exports = router;