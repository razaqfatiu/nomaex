const models = require('../../models/index');
const { Op } = require('sequelize');
const axios = require('axios').default

module.exports = {
  createOrder(req, res) {
    (async () => {
      try {
        const { amount } = req.body
        const { id: customerId } = req.user
        const newData = { amount }

        const getUserShoppingCart = await models.shopping_cart.findAll({
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          },
        });
        const { shoppingCartId } = getUserShoppingCart[0].dataValues

        newOrder = { shoppingCartId, amount, customerId, status: 3 }
        const createNewOrder = await models.order.create(newOrder)
        return res.status(201).json({ message: 'Order has been initialized' });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })()
  },
  getInitializedOrder(req, res) {
    (async () => {
      try {
        const { id: customerId } = req.user
        const getNewUserOrder = await models.order.findAll({
          where: {
            [Op.and]: [{
              customerId,
              status: 3
            }]
          },
        });
        return res.status(200).json({ getNewUserOrder: getNewUserOrder[0] });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })()
  },
  checkOutInit(req, res) {
    (async () => {
      try {
        const { amount } = req.body
        const { email, id: customerId } = req.user
        const newData = { amount, email }
        config = {
          headers: {
            'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }

        const getUserShoppingCart = await models.shopping_cart.findAll({
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          },
        });

        const { shoppingCartId } = getUserShoppingCart[0].dataValues

        newOrder = { shoppingCartId, amount, customerId, status: 2 }
        const createNewOrder = await models.order.create(newOrder)

        const { orderId } = await createNewOrder.dataValues

        const payStackInitializeTransaction = await axios.post('https://api.paystack.co/transaction/initialize', newData, config, { withCredentials: true });

        const transactionResponse = payStackInitializeTransaction.data
        // const authorization_url = await resp.data
        const { authorization_url, access_code, reference } = await transactionResponse.data

        const newInitPayment = { authorization_url, access_code, reference, orderId }
        console.log(newInitPayment)
        const initializePayment = await models.order_payment_init.create(newInitPayment)

        // const payStackInitializeTransaction = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, data, config, { withCredentials: true });

        // const { authorization_url, access_code, reference } = payStackInitializeTransaction.data

        // const CaptureResponseToDb = await models.order_payment.create({
        //   authorization_url, access_code, reference
        // })
        return res.status(201).json({
          initializePayment
        });

        // return res.status(201).json({ createNewOrder });
      }
      catch (error) {
        console.log(error)
        return res.status(500).json({
          error
        });
      }
    })()
  },
  checkOutPay(req, res) {
    (async () => {
      try {
        const { id: customerId } = req.user

        config = {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
        const getUserOrderCheckout = await models.order.findAll({
          where: {
            [Op.and]: [{
              customerId,
              status: 3,
            }]
          },
        });

        const { orderId, amount } = await getUserOrderCheckout[0].dataValues

        const newData = { amount, email }

        const payStackInitializeTransaction = await axios.post('https://api.paystack.co/transaction/initialize', newData, config, { withCredentials: true });

        const { orderId, authorization_url, access_code, reference } = await payStackInitializeTransaction.data.data

        const newInitPayment = { authorization_url, access_code, reference, orderId }
        const initializePayment = await models.order_payment_init.create(newInitPayment)

        return res.status(200).json({
          initializePayment
        });

      }
      catch (error) {
        console.log(error)
        return res.status(500).json({
          error
        });
      }
    })()
  },
  verifyCheckOut(req, res) {
    (async () => {
      try {
        config = {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }


        const payStackInitializeTransaction = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, data, config, { withCredentials: true });

        const { authorization_url, access_code, reference } = payStackInitializeTransaction.data

        const CaptureResponseToDb = await models.order_payment.create({
          authorization_url, access_code, reference
        })
        return res.status(201).json({
          CaptureResponseToDb
        });
      }
      catch (error) {
        console.log(error)
        return res.status(500).json({
          error
        });
      }
    })()
  }
}