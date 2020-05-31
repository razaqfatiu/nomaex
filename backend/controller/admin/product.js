const { Op } = require("sequelize");
const models = require('../../models/index');


module.exports = {
  getAllProducts(req, res) {
    (async () => {
      try {
        const getAllProducts = await models.Product.findAll({
          // attributes: ['productId']
          include: [{ model: models.Product_image }]
          // include: ['product-images']

        })
        // console.log(Product)
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
        const { productId } = req.body
        // console.log(productId)
        const getOneProduct = await models.Product.findAll({
          where: {
            [Op.and]: [
              { productId },
              { isDeleted: false }
            ]
          },
          include: [{ model: models.Product_image }]
        })
        return res.status(200).json({ getOneProduct });
      }
      catch (error) {
        return res.status(500).json({ error });
      }
    })()
  }
}