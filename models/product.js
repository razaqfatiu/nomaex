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
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productShipping: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductShipping',
        key: 'productShippingId',
      },
      onDelete: 'CASCADE',
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'categoryId',
      },
      onDelete: 'CASCADE',
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
      defaultValue: DataTypes.NOW(),
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
      foreignKey: 'category'
    });
    models.Product.belongsTo(models.User, {
      // as: 'users',
      foreignKey: 'uploadedBy'
    });
    models.Product.belongsTo(models.ProductShipping, {
      // as: 'users',
      foreignKey: 'productShipping'
    });
    models.Product.hasMany(models.Product_image, {
      // as: 'product_images',
      foreignKey: 'productId',
    });

  };
  return Product;
};
// module.exports = Product;
