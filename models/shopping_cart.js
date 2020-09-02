'use strict';
module.exports = (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define('shopping_cart', {
    shoppingCartId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onDelete: 'CASCADE',
    },
    checkedOut: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  shopping_cart.associate = function (models) {
    // associations can be defined here
    models.shopping_cart.hasMany(models.Cart, {
      foreignKey: 'shoppingCart'
    });
    models.shopping_cart.hasOne(models.order, {
      foreignKey: 'shoppingCartId'
    });
  };
  return shopping_cart;
};