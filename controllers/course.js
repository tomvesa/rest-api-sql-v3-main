const {Course} = require('../models/');

console.log({Course})
module.exports = {
    registerCourse: async (req,res) => {
      try { 
        let {title, description, estimatedTime, materialsNeeded, userId} = req.body;


        let course = await Course.create({
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        });

        return res.status(201).json({
            message: 'Course created successfully',
            course,
        })
    } catch (err){
        if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){
            const errors = err.errors.map(err => err.message);
           return res.status(400).json({
                message: 'Course creation failed',
                errors })
        } else {
           throw err;
        }
        }
},

getAllCourses: async (req, res) =>{
    try {
        const courses = await Course.findAll({
                    attributes: ['id', 'title', 'description', 'materialsNeeded', 'estimatedTime',  'userId', ],
                    order: [['id', 'DESC']]
                    });
        return res.status(200).json({ courses });
} catch (err) {
    res.status(400).json({err})}
},

getCourseById: async (req, res) =>{
    try {
        let {title, description, estimatedTime, materialsNeeded, userId} = req.body;
        const id = req.params.id

        const course = await Course.findByPk(id, {
            attributes:  ['title', 'description', 'materialsNeeded', 'estimatedTime','userId'],        
        });

        if(!course){
            return res.status(404).json({error: 'Course not found'});
        } else {
        return res.status(200).json({ course });
        }
} catch (err) {
    res.status(400).json({err})}
},

updateCourse: async (req, res) =>{
    try {
        const updatedCourseInfo = req.body; 
        const id = req.params.id
        const course = await Course.findByPk(id);
        console.log(`Course id ${id}`, !course);
        if(!course){
            return res.status(404).json({error: 'Course not found'
        });
        } else if((!updatedCourseInfo.title || !updatedCourseInfo.title === "")||
        (!updatedCourseInfo.description || !updatedCourseInfo.description === "")  ) {

           return res.status(400).json({ error: "Title and description is required"})
        } else {   
        const updatedCourse = await course.update(updatedCourseInfo);
        return res.status(204).end();
        }
} catch (err) {
    res.status(400).json({err})}
},

deleteCourse: async (req, res) =>{
    try {
        const id = req.params.id;
        const course = await Course.findByPk(id);
        if(!course){
            return res.status(404).json({error: 'Course not found'});
        } else {
        const deleteCourse =   await Course.destroy({
                            where:{id: id  }
                        });
            return res.status(204).end();
        }
} catch (err) {
    res.status(400).json({err})}
},

}