require('dotenv').config();
// const debug = require('debug')('app');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/product');
const productImage = require('../../models/product-images');
const models = require('../../models/index');
const { Op, where } = require("sequelize");
const productShipping = require('../../models/product-shipping');
const category = require('../../models/category');

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
        const userId = req.user.id;
        const { isAdministrator } = req.user;
        const createdAt = new Date()
        if (!isAdministrator) {
          return res.status(400).json({ message: 'Only Admins can post products' });
        }

        const {
          productName, productPrice, productDiscount, productDescription, unit, categoryId, cost, state, country, eta,
        } = req.body;
        const { files } = req;
        let imageUrl;
        let imageSize;
        let mimeType;
        let i;
        let filename;

        //  VALIDATION

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const newProductShippingInfo = { cost, state, country, eta, createdAt }

        const uploadShippingDetails = await models.ProductShipping.create(newProductShippingInfo)
        const { productShippingId: productShipping } = uploadShippingDetails.dataValues

        const newProduct = {
          productName, productPrice, productDiscount, productDescription, unit, category: categoryId, uploadedBy: userId, productShipping, createdAt
        };

        const uploadProduct = await models.Product.create(newProduct);
        const { productId } = uploadProduct.dataValues;

        for (i of files) {
          imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
          imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
          mimeType = i.mimetype;
          fileName = i.filename;
          models.Product_image.create({
            imageUrl, imageSize, mimeType, productId, fileName, createdAt
            // imageUrl, imageSize, mimeType, productId,
          });
        }
        return res.status(201).json({ message: "Product Uploaded Successfully" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })();
  },
  getAllProducts(req, res) {
    (async () => {
      try {
        const getAllProducts = await models.Product.findAll({
          include: [{ model: models.Product_image }, { model: models.ProductShipping }],
          where: {
            isDeleted: false
          }
        })
        if (getAllProducts.length === 0) return res.status(404).json({ respose: 'No Products' })
        return res.status(200).json({ getAllProducts });

      }
      catch (error) {
        return res.status(500).json({ error });
      }
    })()
  },
  getOneProduct(req, res) {
    (async () => {
      try {
        const { productId } = req.params
        // console.log(productId)
        const getOneProduct = await models.Product.findAll({
          where: {
            [Op.and]: [
              { productId },
              { isDeleted: false }
            ]
          },
          include: [
            { model: models.Product_image },
            { model: models.ProductShipping }
          ]
        })
        if (getOneProduct.length < 1) return res.status(404).json({ getOneProduct: "Cannot find this Product you are searching for" });
        return res.status(200).json({ getOneProduct });
      }
      catch (error) {
        return res.status(500).json({ error });
      }
    })()
  },
  getProductsByCategory(req, res) {
    (async () => {
      try {
        const { categoryId } = req.params
        // console.log(productId)
        const getProductsByCategory = await models.Product.findAll({
          where: {
            [Op.and]: [
              { category: categoryId },
              { isDeleted: false }
            ]
          },
          include: [{ model: models.Product_image }, { model: models.ProductShipping }]
        })
        if (getProductsByCategory.length < 1) return res.status(404).json({ getProductsByCategory: "Cannot find products in this Category you are searching" });
        return res.status(200).json({ getProductsByCategory });
      }
      catch (error) {
        return res.status(500).json({ error });
      }
    })()
  },
  updateProduct(req, res) {
    (async () => {
      try {
        const userId = 2 || req.user.id;
        const { isAdministrator } = req.user;

        if (!isAdministrator) {
          return res.status(400).json({ message: 'Only Admins can post products' });
        }

        const {
          productName, productPrice, productDiscount, productDescription, unit, categoryId, cost, state, country, eta, productShipping
        } = req.body;
        let { productId } = req.params
        const { files } = req;
        let imageUrl;
        let imageSize;
        let mimeType;
        let fileName
        let i;

        //  VALIDATION

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const productShippingInfo = { cost, state, country, eta }

        const uploadShippingDetails = await models.ProductShipping.update(productShippingInfo,
          { where: { productShippingId: productShipping } })
        // const { productShippingId: productShipping } = uploadShippingDetails.dataValues

        const updatedProductData = {
          productName, productPrice, productDiscount, productDescription, unit, category: categoryId, uploadedBy: userId,

        };
        // console.log(newProduct, productId)


        const returnUpdatedProduct = await models.Product.findByPk(productId, {
          include: [{ model: models.Product_image }]
        })

        productId = returnUpdatedProduct.dataValues.productId;
        const productImages = []
        for (i of files) {
          imageUrl = `${req.protocol}://${req.get('host')}/product-images/${i.filename}`;
          imageSize = `${((i.size) / 1048576).toFixed(3)}MB`;
          mimeType = i.mimetype;
          fileName = i.filename
          productImages.push({ imageUrl, imageSize, mimeType, productId, fileName })
        }
        const getAssociatedproductImage = await models.Product_image.findAll({ where: { productId } })

        if (getAssociatedproductImage.length !== productImages.length) {
          return res.status(400).json({ response: `Select ${getAssociatedproductImage.length} Image(s)` });
        }


        const updateProduct = await models.Product.update(
          updatedProductData,
          { returning: true, where: { productId } }
        );

        getAssociatedproductImage.map((associatedImage, i) => {
          models.Product_image.update(
            productImages[i],
            { where: { imageId: associatedImage.imageId } }
          );
        })

        const returnUpdatedProduct2 = await models.Product.findByPk(productId, {
          include: [{ model: models.Product_image }, { model: models.ProductShipping }]
        },
          //  { where: { productId } }
        )

        return res.status(201).json({ result: "Product updated successfully" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })();
  },
  deleteProduct(req, res) {
    (async () => {
      try {
        const { productId } = req.params
        const markAsDeleted = await models.Product.update({ isDeleted: true, deletedAt: new Date() }, {
          where: {
            productId
          }
        });

        const getAssociatedproductImage = await models.Product_image.findAll({ where: { productId } })

        getAssociatedproductImage.map((associatedImage, i) => {
          models.Product_image.update(
            { isDeleted: true, deletedAt: new Date() },
            { where: { imageId: associatedImage.imageId } }
          );
        })
        return res.status(204).json({ response: 'Product deleted successfully' })
      }
      catch (error) {
        return res.status(500).json({ error })
      }
    })()

  }
}