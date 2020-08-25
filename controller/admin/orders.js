const models = require('../../models/index');
const { Op } = require('sequelize');
const axios = require('axios').default

module.exports = {
  createOrder(req, res) {
    (async () => {
      try {
        const { amount } = req.body
        const { id: customerId } = req.user
        const getUserShoppingCart = await models.shopping_cart.findAll({
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          },
        });
        const { shoppingCartId } = getUserShoppingCart[0].dataValues

        const checkIfOrderExists = await models.order.findAll({
          where: {
            [Op.and]: [{
              shoppingCartId,
              customerId,
            }]
          }
        })
        if (checkIfOrderExists.length > 0) return res.status(302).json({ message: 'order has been created previously' });
        newOrder = { shoppingCartId, amount, customerId, status: 3 }
        const createNewOrder = await models.order.create(newOrder)
        return res.status(201).json({ data: createNewOrder.dataValues.amount });
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
  // checkOutInit(req, res) {
  //   (async () => {
  //     try {
  //       const { amount } = req.body
  //       const { email, id: customerId } = req.user
  //       const callback_url = `${process.env.frontEndURL}/order`
  //       const newData = { amount, email, callback_url }
  //       config = {
  //         headers: {
  //           'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }

  //       const getUserShoppingCart = await models.shopping_cart.findAll({
  //         where: {
  //           [Op.and]: [{
  //             customerId,
  //             checkedOut: false
  //           }]
  //         },
  //       });

  //       const { shoppingCartId } = getUserShoppingCart[0].dataValues

  //       newOrder = { shoppingCartId, amount: (parseInt(amount) * 1000), customerId, status: 2 }
  //       const createNewOrder = await models.order.create(newOrder)

  //       const { orderId } = await createNewOrder.dataValues

  //       const payStackInitializeTransaction = await axios.post('https://api.paystack.co/transaction/initialize', newData, config, { withCredentials: true });

  //       // const transactionResponse = payStackInitializeTransaction.data
  //       // const authorization_url = await resp.data
  //       const { authorization_url, access_code, reference } = await payStackInitializeTransaction.data.data
  //       // const { authorization_url, access_code, reference } = await transactionResponse.data

  //       const newInitPayment = { authorization_url, access_code, reference, orderId }
  //       console.log(newInitPayment)
  //       const initializePayment = await models.order_payment_init.create(newInitPayment)

  //       return res.status(201).json({
  //         initializePayment
  //       });

  //       // return res.status(201).json({ createNewOrder });
  //     }
  //     catch (error) {
  //       console.log(error)
  //       return res.status(500).json({
  //         error
  //       });
  //     }
  //   })()
  // },
  checkOutPay(req, res) {
    (async () => {
      try {
        const { id: customerId, email } = req.user

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
        const callback_url = `${process.env.frontEndURL}/order/verify`
        const newData = { amount: (parseInt(amount) * 100), email, callback_url }
        const payStackInitializeTransaction = await axios.post('https://api.paystack.co/transaction/initialize', newData, config, { withCredentials: true });

        const { authorization_url, access_code, reference } = await payStackInitializeTransaction.data.data

        const newInitPayment = { authorization_url, access_code, reference, orderId, customerId, createdAt: new Date() }
        const initializePayment = await models.order_payment_init.create(newInitPayment)

        const setCheckOut = await models.order.update(
          {
            status: 4,
            checkedOut: true,
            updatedAt: new Date()
          }, {
          where: {
            [Op.and]: [{
              orderId,
              customerId,
            }]
          }
        })
        const setShoppingCart = await models.shopping_cart.update(
          {
            checkedOut: true,
            updatedAt: new Date()
          }, {
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          }
        })

        return res.status(200).json({
          authorization_url
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
        const { id: customerId } = req.user
        // const { reference } = req.body
        config = {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }

        const getLastUserOrderCheckout = await models.order_payment_init.findAll({
          limit: 1,
          where: {
            [Op.and]: [{
              customerId,
            }]
          },
          include: [{ model: models.order }],
          order: [['createdAt', 'DESC']]
        })
        const { reference, orderId, orderPaymentInitId } = await getLastUserOrderCheckout[0].dataValues

        const checkIfPaymentExists = await models.verify_order_payment.findAll({
          where: {
            [Op.and]: [{
              orderId,
              status: 'success'
            }]
          }
        })

        if (checkIfPaymentExists.length > 0) return res.status(200).json({ data: 'Payment Was verified' });

        const payStackVerifyTransaction = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, config, { withCredentials: true });

        const { amount, currency, transaction_date, status, reference: ref, domain, metadata, gateway_response, message, channel, ip_address, log, fees, authorization, customer, plan, requested_amount } = await payStackVerifyTransaction.data.data
        // const { time_spent, attempts, authentication, errors, success, mobile, input, channel, history, } = await payStackVerifyTransaction.data.data.log



        const capturePaymentVerifyResponse = await models.verify_order_payment.create({
          orderId, amount, currency, transaction_date, status, reference: ref, domain, metadata, orderPaymentInitId, gateway_response, message, channel, ip_address, createdAt: new Date(),
        })

        const { verifyOrderPaymentId } = await capturePaymentVerifyResponse.dataValues

        const capturePaymentVerifyResponseLog = await models.verify_order_payment_log.create({
          verifyOrderPaymentId, log, fees, authorization, customer, plan, requested_amount, createdAt: new Date()
        })
        return res.status(201).json({
          data: capturePaymentVerifyResponse
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
  cancelOrder(req, res) {
    (async () => {
      try {
        const { id: customerId } = req.user
        const getCurrentOrder = await models.order.findOne({
          where: {
            customerId,
            checkedOut: false
          }
        })
        if (getCurrentOrder.length === 0) return res.status(400).json({ message: 'No Initiated Order' });
        const { orderId } = await getCurrentOrder.dataValues

        await models.order.update(
          {
            status: 2,
            checkedOut: true,
            updatedAt: new Date(),
            isDeleted: true,
            deletedAt: new Date(),
          }, {
          where: {
            [Op.and]: [{
              customerId,
              orderId
            }]
          }
        })

        await models.shopping_cart.update(
          {
            checkedOut: true,
            updatedAt: new Date()
          }, {
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: false
            }]
          }
        })

        res.status(204).json({ message: 'Order was cancelled Successfully' });
      } catch (error) {
        res.status(500).json({ error });
      }
    })()
  },
  getRecentOrders(req, res) {
    (async () => {
      try {
        const { id: customerId } = req.user
        const getUserRecentOrder = await models.order.findAll({
          limit: 5,
          where: {
            [Op.and]: [{
              customerId,
              checkedOut: true
            }],
          },
          order: [['createdAt', 'DESC']],
          include: [{
            model: models.order_status,
            attributes: ['status', 'label']
          },]
        });
        res.status(200).json({ data: getUserRecentOrder });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error });
      }

    })()
  }
}
