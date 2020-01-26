const { sequelize, Sequelize } = require('./connection');


const productImage = sequelize.define('product-image', {
  imageId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    references: {
      model: 'products',
      key: 'productId',
    },
    onDelete: 'CASCADE',
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null,
  },

}, {});
productImage.associate = (models) => {
  // associations can be defined here
  productImage.belongsTo(models.Product, { foreignKey: 'product-images_ibfk_1' });
};

module.exports = productImage;

// module.exports = (sequelize, Sequelize) => {
//   const productImage = sequelize.define('product-image', {
//     imageId: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     imageSize: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     mimeType: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     productId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'products',
//         key: 'productId',
//       },
//     },

//   }, {});
//   productImage.associate = (models) => {
//     // associations can be defined here
//     // productImage.belongsTo(models.Product);
//   };
//   return productImage;
// };
