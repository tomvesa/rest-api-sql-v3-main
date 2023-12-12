const express = require('express');
const courseRouter = express.Router();
const { authenticateUser } = require('../../middleware/auth-user');

// import controllers to handle route requests
const { registerCourse, 
        getAllCourses,
        getCourseById,
        updateCourse,
        deleteCourse,
                        } = require('../../controllers/course');


// all courses routes
courseRouter.post('/', authenticateUser, registerCourse);
courseRouter.get('/', getAllCourses);

// individual course routes
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', authenticateUser, updateCourse);
courseRouter.delete('/:id', authenticateUser, deleteCourse);




module.exports = courseRouter;