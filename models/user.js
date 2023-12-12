'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First Name is required'
      },
      notEmpty: {
        msg: 'Please enter First Name'
    },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Last Name'
      },
      notEmpty: {
        msg: 'Please enter Last Name'
    },
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        msg: 'This email address is already in use'
      },
      validate: {
        notNull:{
          msg: 'Email is required'
        },
        isEmail : {
          msg: 'Please enter valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a password'
        },
        notEmpty: {
          msg: 'Please enter a password'
        }
      },
      set(val) {
        if (val){
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(val, salt);
          this.setDataValue('password', hashedPassword);
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (model) => {
    User.hasMany(model.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: true,
      },
    });
  }

  return User;
};