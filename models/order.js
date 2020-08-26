// /* eslint-disable no-unused-vars */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    shoppingCartId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'shopping_carts',
        key: 'shoppingCartId',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'order_statuses',
        key: 'orderStatusId',
      },
      onDelete: 'CASCADE',
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

  order.associate = (models) => {
    // models.order.belongsTo(models.Product, { foreignKey: 'productId' });
    models.order.belongsTo(models.User, { foreignKey: 'customerId' });
    models.order.belongsTo(models.order_status, { foreignKey: 'status' });
    models.order.hasOne(models.shipping_info, { foreignKey: 'shippingInfoId' });
    
    models.order.belongsTo(models.shopping_cart, { foreignKey: 'shoppingCartId' });
    models.order.hasOne(models.order_payment_init, { foreignKey: 'orderId' });
    models.order.hasOne(models.verify_order_payment, { foreignKey: 'verifyOrderPaymentId' });
  };
  return order
}
