const models = require('../../models/index');
const { Op } = require('sequelize');

module.exports = {
  addItemsToCart(req, res) {
    (async () => {
      try {
        let addItemToCart
        let { productId, quantity } = req.body
        productId = parseInt(productId)
        const createdAt = new Date()
        const customerId = req.user.id

        const checkIfProductExistInTheShoppingCart = await models.shopping_cart.findAll({
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          },
          // include: [{ model: models.Product }]
        });
        let shoppingCartId
        if (checkIfProductExistInTheShoppingCart.length > 0) {
          shoppingCartId = checkIfProductExistInTheShoppingCart[0].dataValues.shoppingCartId
        }
        else {
          const newShoppingCart = { customerId, createdAt: new Date() }
          const createShoppingCart = await models.shopping_cart.create(newShoppingCart);
          shoppingCartId = createShoppingCart.dataValues.shoppingCartId
        }

        const checkIfProductExistInTheCart = await models.Cart.findAll({
          where: {
            [Op.and]: [{
              productId,
              customerId
            }]
          },
          // include: [{ model: models.Product }]
        });

        let checkIfProductExistInTheCartResult
        const newItemsToCart = { productId, customerId, shoppingCart: shoppingCartId, quantity: parseInt(quantity), checkedOut: false, createdAt }
        if (checkIfProductExistInTheCart.length > 0) {
          checkIfProductExistInTheCartResult = checkIfProductExistInTheCart[0].dataValues
          const currentQuantity = parseInt(checkIfProductExistInTheCartResult.quantity)
          addItemToCart = await models.Cart.update({ quantity: currentQuantity + parseInt(quantity) }, { where: { productId } })
          return res.status(200).json({ message: 'Added item to cart', addItemToCart });
        }
        addItemToCart = await models.Cart.create(newItemsToCart)
        return res.status(200).json({ message: 'Added item to cart' });
      }
      catch (error) {
        console.log(error)
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
        const getUserShoppingCart = await models.shopping_cart.findAll({
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          },
        });
        if (getUserShoppingCart.length === 0) return res.status(404).json({ getUserCart: 'There is no product in cart yet' });
        const { shoppingCartId } = getUserShoppingCart[0].dataValues

        const getUserCart = await models.Cart.findAll({
          where: {
            [Op.and]: [{
              shoppingCart: shoppingCartId,
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