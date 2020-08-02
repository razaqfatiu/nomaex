// /* eslint-disable no-unused-vars */
// const db = require('./index');
'use strict';

// const Product = require('./product');

// // const { sequelize, Sequelize } = db;
// const { sequelize, Sequelize } = require('./connection');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {});
  // {
  //   indexes: [
  //     {
  //         unique: true,
  //         fields: ['value']
  //     }
  // ]
  // });
  Category.associate = (models) => {
    models.Category.hasMany(models.Product,
      {
        as: 'categories',
        foreignKey: 'category',
        // foreignKey: {
        //   allowNull: false
        // }
      });
  };
  return Category
}
// module.exports = category;
