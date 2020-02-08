require('dotenv').config();
// const debug = require('debug')('app');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/product');
const productImage = require('../../models/product-images');


module.exports = {
  uploadValidator: [
    check('productName', 'product name should not be empty').trim()
      .not().isEmpty(),
    check('productPrice', 'Product price should not be empty').trim()
      .not().isEmpty(),
    check('productDescription', 'Product Description should not be empty').trim()
      .not().isEmpty()
      .isLength({ min: 5 }),
    check('unit', 'Product unit should not be empty').trim()
      .not().isEmpty(),
  ],
  postProduct(req, res) {
    (async () => {
      try {
        const userId = req.user.id;
        const { isAdministrator } = req.user;

        if (!isAdministrator) {
          return res.status(400).json({ message: 'Only Admins can post products' });
        }

        const {
          productName, productPrice, productDescription, unit, categoryId,
        } = req.body;
        const { files } = req;
        let imageUrl;
        let imageSize;
        let mimeType;
        let i;

        //  VALIDATION

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const newProduct = {
          productName, productPrice, productDescription, unit, categoryId, uploadedBy: userId,
        };

        const uploadProduct = await Product.create(newProduct);
        const { productId } = uploadProduct.dataValues;

        for (i of files) {
          imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
          imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
          mimeType = i.mimetype;
          productImage.create({
            imageUrl, imageSize, mimeType, productId,
          });
        }
        return res.status(201).json({ result: uploadProduct });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })();
  },
  // postAnimal(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION

  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Animal.sync();
  //       const uploadProduct = await Animal.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await animalImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         animalImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postFarmTool(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await farmTool.sync();
  //       const uploadProduct = await farmTool.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await farmToolsImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         farmToolsImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postFruit(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Fruit.sync();
  //       const uploadProduct = await Fruit.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await fruitImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         fruitImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postFishery(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Fishery.sync();
  //       const uploadProduct = await Fishery.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await fisheryImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         fisheryImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postGrain(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Grain.sync();
  //       const uploadProduct = await Grain.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await grainImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         grainImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postPoultry(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Poultry.sync();
  //       const uploadProduct = await Poultry.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await poultryImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         poultryImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postService(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Service.sync();
  //       const uploadProduct = await Service.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await serviceImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         serviceImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postTuber(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Tuber.sync();
  //       const uploadProduct = await Tuber.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await tuberImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         tuberImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
  // postVegetable(req, res) {
  //   (async () => {
  //     try {
  //       const userId = req.user.id;
  //       const { isAdministrator } = req.user;

  //       if (!isAdministrator) {
  //         return res.status(400).json({ message: 'Only Admins can post products' });
  //       }

  //       const {
  //         productName, productPrice, productDescription, unit,
  //       } = req.body;
  //       const { files } = req;
  //       let imageUrl;
  //       let imageSize;
  //       let mimeType;
  //       let i;

  //       //  VALIDATION
  //       const errors = validationResult(req.body);
  //       if (!errors.isEmpty()) {
  //         return res.status(422).json({ errors: errors.array() });
  //       }

  //       const newProduct = {
  //         productName, productPrice, productDescription, unit, uploadedBy: userId,
  //       };

  //       await Vegetable.sync();
  //       const uploadProduct = await Vegetable.create(newProduct);
  //       const { productId } = uploadProduct.dataValues;

  //       await vegetableImageTable.sync();

  //       for (i of files) {
  //         imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
  //         imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
  //         mimeType = i.mimetype;
  //         vegetableImageTable.create({
  //           imageUrl, imageSize, mimeType, productId,
  //         });
  //       }
  //       return res.status(201).json({ result: uploadProduct });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   })();
  // },
};
