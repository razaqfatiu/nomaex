/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Product_images', {
    imageId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageSize: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mimeType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      // onDelete: 'CASCADE',
      references: {
        model: 'Products',
        key: 'productId',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Product_images'),
};
