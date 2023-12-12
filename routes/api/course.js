const express = require('express');
const courseRouter = express.Router();
const { authenticateUser } = require('../../middleware/auth-user');

const { registerCourse, 
        getAllCourses,
        getCourseById,
        updateCourse,
        deleteCourse,
                        } = require('../../controllers/course');



courseRouter.post('/', authenticateUser, registerCourse);
courseRouter.get('/', getAllCourses);

courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', authenticateUser, updateCourse);
courseRouter.delete('/:id', authenticateUser, deleteCourse);




module.exports = courseRouter;