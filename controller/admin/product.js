const { Op } = require("sequelize");
const models = require('../../models/index');


module.exports = {
  getAllProducts(req, res) {
    (async () => {
      try {
        const getAllProducts = await models.Product.findAll({
          // attributes: ['productId']
          include: [
            { model: models.Product_image },
            { model: models.ProductShipping }
          ]
          // include: ['product-images']

        })
        if (getAllProducts.length === 0) return res.status(400).json({ respose: 'No Products' })
        // console.log(Product)
        return res.status(200).json({ getAllProducts });

      }
      catch (error) {
        return res.status(500).json({ error: error.message });
      }
    })()
  },
}