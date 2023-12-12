const express = require('express');
const router = express.Router();

//import individual routers
const userRouter = require('./user');
const courseRouter = require('./course');



//combine routes together into a single router
router.use('/users', userRouter);
router.use('/courses', courseRouter);

module.exports = router;