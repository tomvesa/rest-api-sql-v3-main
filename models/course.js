'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}
  Course.init({
    // title is required and cannot be empty
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
         msg: 'Course title is required',
      },
        notEmpty: {
          msg: 'Please enter a title'
        }
    }
    },
        // description is required and cannot be empty
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course description is required'
        },
        notEmpty: {
          msg: 'Please enter a description',
        }
      }
    },
    // option fields
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
  });

  // coure belongs to one user (presenter)
  Course.associate = (model) => {
    Course.belongsTo(model.User, {
      as: 'Instructor', //alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: true,
      },
    });
  }
  return Course;
};