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
        let filename;

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
          fileName = i.filename;
          models.Product_image.create({
            imageUrl, imageSize, mimeType, productId, fileName
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
  getAllProducts(req, res) {
    (async () => {
      try {
        const getAllProducts = await models.Product.findAll({
          include: [{ model: models.Product_image }],
          where: {
            isDeleted: false
          }
        })
        if (getAllProducts.length === 0) return res.status(400).json({ respose: 'No Products' })
        // console.log(Product)
        return res.status(200).json({ getAllProducts });

      }
      catch (error) {
        return res.status(500).json({ error });
      }
    })()
  },
  updateProduct(req, res) {
    (async () => {
      try {
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
        let fileName
        let i;

        //  VALIDATION

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const newProduct = {
          productName, productPrice, productDescription, unit, categoryId, uploadedBy: userId,
        };
        console.log(newProduct, productId)

        const updateProduct = await models.Product.update(
          newProduct,
          { returning: true, where: { productId } }
        );



        // const updateProduct = await models.Product.findAll({ where: { productId } })
        //   .on('success', function (product) {
        //     // Check if record exists in db
        //     if (product) {
        //       product.update(newProduct)
        //         .success(function () { console.log('product Updated successfully!') })
        //     }
        //   })

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
          return res.status(400).json({ response: `Select ${getAssociatedproductImage.length} images` });
        }

        getAssociatedproductImage.map((associatedImage, i) => {
          models.Product_image.update(
            productImages[i],
            { where: { imageId: associatedImage.imageId } }
          );
        })

        const returnUpdatedProduct2 = await models.Product.findByPk(productId, {
          include: [{ model: models.Product_image }]
        },
          //  { where: { productId } }
        )

        return res.status(201).json({ returnUpdatedProduct2 });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })();
  },
  deleteProduct(req, res) {
    (async () => {
      try {
        const { productId } = req.body
        const markAsDeleted = await models.Product.update({ isDeleted: true, deletedAt: Date.now }, {
          where: {
            productId
          }
        });

        const getAssociatedproductImage = await models.Product_image.findAll({ where: { productId } })

        getAssociatedproductImage.map((associatedImage, i) => {
          models.Product_image.update(
            { isDeleted: true, deletedAt: Date.now },
            { where: { imageId: associatedImage.imageId } }
          );
        })
        return res.status(204).json({ response: 'Product deleted successfully' })
      }
      catch (error) {
        return res.status(500).json({ error })
      }
    })()

  },
  addProductToCart(req, res) {
    (async () => {
      try {
        const userId = 1 || req.user.id;

        const {
          productId, customerId, quantity,
        } = req.body;

        //  VALIDATION

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const newCart = {
          productId, customerId, quantity,
        };

        const addToCart = await models.Cart.create(newCart);

        return res.status(201).json({ result: addToCart });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })();
  }
}