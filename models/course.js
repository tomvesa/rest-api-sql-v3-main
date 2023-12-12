'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}
  Course.init({
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
      estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate = (model) => {
    Course.belongsTo(model.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: true,
      },
    });
  }
  return Course;
};