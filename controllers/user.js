const {User} = require('../models/');


module.exports = {
    register: async (req,res) => {
      try { 
        let {firstName, lastName, emailAddress, password} = req.body;

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

deleteUser: async (req, res) =>{
    try {
        const id = req.params.id;    
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        } else {
        const deleteUser =   await User.destroy({
                            where:{id: id  }
                        });
            return res.status(204).end();
        }
    } catch (err) {
    res.status(400).json({err})}
}

}