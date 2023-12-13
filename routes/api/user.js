const express = require('express');
const userRouter = express.Router();
const { authenticateUser } = require('../../middleware/auth-user');

// import controllers to handle individual route requests/http methods
const { register, getCurrentUser, deleteUser } = require('../../controllers/user');



userRouter.post('/', register);
userRouter.get('/', authenticateUser, getCurrentUser);
userRouter.delete('/:id', authenticateUser, deleteUser);



module.exports = userRouter;