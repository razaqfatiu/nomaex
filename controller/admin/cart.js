const models = require('../../models/index');
const { Op } = require('sequelize')

module.exports = {
  addItemsToCart(req, res) {
    (async () => {
      try {
        let addItemToCart
        let { productId, quantity } = req.body
        const customerId = req.user.id
        const checkIfProductExistInTheCart = await models.Cart.findAll({
          where: {
            [Op.and]: [{
              productId
            }]
          },
          // include: [{ model: models.Product }]
        });
        let checkIfProductExistInTheCartResult
        const newItemsToCart = { productId, customerId, quantity: parseInt(quantity), checkedOut: false }
        if (checkIfProductExistInTheCart.length > 0) {
          checkIfProductExistInTheCartResult = checkIfProductExistInTheCart
          const currentQuantity = parseInt(checkIfProductExistInTheCart[0].dataValues.quantity)
          addItemToCart = await models.Cart.update({ quantity: currentQuantity + parseInt(quantity) }, { where: { productId } })
        }
        else {
          addItemToCart = await models.Cart.create(newItemsToCart)
        }
        return res.status(200).json({ message: 'Added item to cart' });
      }
      catch (error) {
        // console.log(error)
        return res.status(500).json({ errorResponse: error });
      }
    })()
  },
  removeItemFromCart(req, res) {
    (async () => {
      try {
        const { cartId } = req.params
        console.log(cartId)
        const removeItem = await models.Cart.destroy({
          where: { cartId }
        })
        return res.status(200).json({ message: 'Removed item successfully' });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })()
  },
  getItemsInUserCart(req, res) {
    (async () => {
      try {
        const customerId = req.user.id
        const getUserCart = await models.Cart.findAll({
          where: {
            [Op.and]: [{
              customerId
            }, {
              checkedOut: false
            }]
          },
          include: [{ model: models.Product, include: models.ProductShipping }]
        });
        return res.status(200).json({
          getUserCart
        });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })()
  }
}