// const { sequelize, Sequelize } = require('./connection');
'use strict';

module.exports = (sequelize, DataTypes) => {
const ProductImage = sequelize.define('Product_image', {
  imageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'productId',
    },
    onDelete: 'CASCADE',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },

}, {});

ProductImage.associate = (models) => {
  // associations can be defined here
  models.Product_image.belongsTo(models.Product, {
    as: 'products',
    foreignKey: 'productId',
    // foreignKey: 'product-images_ibfk_1',
    
  });
};
  return ProductImage
}
