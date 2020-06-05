'use strict';


module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'categoryId',
      },
      onDelete: 'CASCADE',
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'userId',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {})
  Product.associate = (models) => {
    models.Product.belongsTo(models.Category, {
      // as: 'category',
      foreignKey: 'productId'
    });
    models.Product.belongsTo(models.User, {
      // as: 'users',
      foreignKey: 'uploadedBy'
    });
    models.Product.hasMany(models.Product_image, {
      // as: 'product_images',
      foreignKey: 'productId',
    });

  };
  return Product;
};
// module.exports = Product;
