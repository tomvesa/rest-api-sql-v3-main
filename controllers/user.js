const {User} = require('../models/');

//methods for controlling the interaction with the user tables and user models
module.exports = {
    // create a new user instance
    register: async (req,res) => {
      try { 
        // get the user information from the request object
        let {firstName, lastName, emailAddress, password} = req.body;
        // create a new user instance in the database
        let user = await User.create({
            firstName,
            lastName,
            emailAddress,
            password
        });

        return res.status(201).json({
            message: 'User created successfully',
            user,
        })
    } catch (err){
        console.log(err.errors)
        if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){
            const errors = err.errors.map(err => err.message);
            res.status(400).json({errors })
        } else {
            throw err;
        }
    }
},

//get all users and print them out in descending order by id
getAllUsers: async (req, res) =>{
    try {
        const users = await User.findAll({
                    attributes: ['id', 'firstName', 'lastName', 'emailAddress' ],
                    order: [['id', 'DESC']]
                    });
        return res.status(200).json({ users });
} catch (err) {
    res.status(400).json({err})}
},

// delete user
deleteUser: async (req, res) =>{
    try {
        // get id of the user to delete, then find the instance in the database
        const id = req.params.id;    
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        } else {
        // if the user is found, delete it    
        const deleteUser =   await User.destroy({
                            where:{id: id  }
                        });
            return res.status(204).end();
        }
    } catch (err) {
    res.status(400).json({err})}
}

}