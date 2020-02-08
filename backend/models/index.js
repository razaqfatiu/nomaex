/* eslint-disable max-len */

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.js')[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // console.log(db);

// fs
//   .readdirSync(__dirname)
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


// db.User = require('./user-account')(sequelize, Sequelize);
// db.Product = require('./product')(sequelize, Sequelize);
// db.Order = require('./order')(sequelize, Sequelize);
// db.Category = require('./category')(sequelize, Sequelize);

// db.farmTool = require('./post-product')(sequelize, Sequelize, 'farm-tool');
// db.Fishery = require('./post-product')(sequelize, Sequelize, 'fishery');
// db.Fruit = require('./post-product')(sequelize, Sequelize, 'fruit');
// db.Grain = require('./post-product')(sequelize, Sequelize, 'grain');
// db.Other = require('./post-product')(sequelize, Sequelize, 'other');
// db.Poultry = require('./post-product')(sequelize, Sequelize, 'poultry');
// db.Service = require('./post-product')(sequelize, Sequelize, 'service');
// db.Tuber = require('./post-product')(sequelize, Sequelize, 'tuber');
// db.Vegetable = require('./post-product')(sequelize, Sequelize, 'vegetable');

// db.productImage = require('./product-images')(sequelize, Sequelize);

// db.farmToolsImageTable = require('./product-images')(sequelize, Sequelize, 'farmtool-image', 'farmTool');
// db.fruitImageTable = require('./product-images')(sequelize, Sequelize, 'fruit-image', 'fruit');
// db.fisheryImageTable = require('./product-images')(sequelize, Sequelize, 'fishery-image', 'fishrie');
// db.grainImageTable = require('./product-images')(sequelize, Sequelize, 'grain-image', 'grain');
// db.poultryImageTable = require('./product-images')(sequelize, Sequelize, 'poultry-image', 'poultrie');
// db.serviceImageTable = require('./product-images')(sequelize, Sequelize, 'service-image', 'service');
// db.tuberImageTable = require('./product-images')(sequelize, Sequelize, 'tuber-image', 'tuber');
// db.vegetableImageTable = require('./product-images')(sequelize, Sequelize, 'vegetable-image', 'vegetable');
// // db.productImage = require('./admin/product-images');

// db.Product.hasMany(db.productImage);
// db.productImage.belongsTo(db.Product);

// db.Product.hasMany(db.Order);
// db.Order.belongsTo(db.Product);

// db.Category.hasMany(db.Product);
// db.Product.belongsTo(db.Category);


// db.Animal.hasMany(db.animalImageTable);
// db.animalImageTable.belongsTo(db.Animal);

// db.farmTool.hasMany(db.farmToolsImageTable);
// db.farmToolsImageTable.belongsTo(db.farmTool);

// db.Fishery.hasMany(db.fisheryImageTable);
// db.fisheryImageTable.belongsTo(db.Fishery);

// db.Fruit.hasMany(db.fruitImageTable);
// db.fruitImageTable.belongsTo(db.Fruit);

// db.Grain.hasMany(db.grainImageTable);
// db.grainImageTable.belongsTo(db.Grain);

// db.Poultry.hasMany(db.poultryImageTable);
// db.poultryImageTable.belongsTo(db.Poultry);

// db.Service.hasMany(db.serviceImageTable);
// db.serviceImageTable.belongsTo(db.Service);

// db.Tuber.hasMany(db.tuberImageTable);
// db.tuberImageTable.belongsTo(db.Tuber);

// db.Vegetable.hasMany(db.vegetableImageTable);
// db.vegetableImageTable.belongsTo(db.Vegetable);


// module.exports = db;

// exports = Sequelize;
// exports = sequelize;
