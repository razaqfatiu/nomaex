// /* eslint-disable no-unused-vars */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'productId',
      },
      onDelete: 'CASCADE',
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
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

  Cart.associate = (models) => {
    models.Cart.belongsTo(models.Product, { foreignKey: 'productId' });
    models.Cart.belongsTo(models.User, { foreignKey: 'customerId' });
    // models.Cart.belongsTo(models.ProductShipping, { foreignKey: 'productShipping' });
  };
  return Cart
}
