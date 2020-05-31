require('dotenv').config();
// const debug = require('debug')('app');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/product');
const productImage = require('../../models/product-images');
const models = require('../../models/index');

module.exports = {
  uploadValidator: [
    check('productName', 'product name should not be empty').trim()
      .not().isEmpty(),
    check('productPrice', 'Product price should not be empty').trim()
      .not().isEmpty().isInt(),
    check('productDescription', 'Product Description should not be empty and less than 20').trim()
      .not().isEmpty()
      .isLength({ min: 2 }),
    check('unit', 'Product unit should not be empty').trim()
      .not().isEmpty(),
  ],
  postProduct(req, res) {
    (async () => {
      try {
        const userId = 1 || req.user.id;
        // const { isAdministrator } = req.user;

        // if (!isAdministrator) {
        //   return res.status(400).json({ message: 'Only Admins can post products' });
        // }

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

        const uploadProduct = await models.Product.create(newProduct);
        const { productId } = uploadProduct.dataValues;

        for (i of files) {
          imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
          imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
          mimeType = i.mimetype;
          models.Product_image.create({
            imageUrl, imageSize, mimeType, productId,
            // imageUrl, imageSize, mimeType, productId,
          });
        }
        return res.status(201).json({ result: uploadProduct });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })();
  },
  updateProduct(req, res) {
    (async () => {
      try {
        console.log(req.files)
        return 
        const userId = 1 || req.user.id;
        // const { isAdministrator } = req.user;

        // if (!isAdministrator) {
        //   return res.status(400).json({ message: 'Only Admins can post products' });
        // }

        const {
          productName, productPrice, productDescription, unit, categoryId
        } = req.body;
        let { productId } = req.body
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

        const updateProduct = await models.Product.update(
          newProduct,
          { where: { productId } }
        );
        productId = updateProduct.dataValues.productId;
        const productImages = []
        for (i of files) {
          imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
          imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
          mimeType = i.mimetype;
          productImages.push({ imageUrl, imageSize, mimeType, productId, })
        }
        const getAssociatedproductImage = await models.Product_image.findAll({ where: { productId } })

        if(getAssociatedproductImage.length !== productImages.length) {
          return res.status(400).json({ response: `Select ${getAssociatedproductImage.length} images` });
        }

        getAssociatedproductImage.map((associatedImage, i) => {
          models.Product_image.update(
            productImages[i],
            { where: { imageId: associatedImage.imageId } }
        );
        })
        
        return res.status(201).json({ result: updateProduct });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })();
  }
}