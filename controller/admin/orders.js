const models = require('../../models/index');
const { Op } = require('sequelize');
const { orderComfirmed } = require('../../helper/mail');
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
        return res.status(500).json({ error: error.message });
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
          include: [],
        });
        return res.status(200).json({ getNewUserOrder: getNewUserOrder[0] });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    })()
  },
  checkOutPay(req, res) {
    (async () => {
      try {
        const { id: customerId, email } = req.user
        const { address, state } = req.body

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

        // if(payStackInitializeTransaction.data === null || payStackInitializeTransaction.dat === undefined) {
        //   return res.status.json({ message: 'Paystack initialization failed' })
        // }
        
        const { authorization_url, access_code, reference } = await payStackInitializeTransaction.data.data

        const newInitPayment = { authorization_url, access_code, reference, orderId, customerId, createdAt: new Date() }

        const createOrderShippingInfo = await models.shipping_info.create({ orderId, customerId, address: address + state })

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
        return res.status(500).json({
          error: error.message
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
        console.log(payStackVerifyTransaction.status)
        if(payStackVerifyTransaction.status !== 200) return res.status(400).json({ message: 'Verification failed or payment not completed'});

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
        return res.status(500).json({
          error: error.message
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
      }

    })()
  },
  adminGetAllOrders(req, res) {
    (async () => {
      try {
        const { isAdministrator } = req.user;
        if (!isAdministrator) {
          return res.status(401).json({
            error: 'Only Admins can see this',
          });
        }
        const adminGetAllRecentOrder = await models.order.findAll({
          where: {
            [Op.and]: [{
              status: 4,
              checkedOut: true
            }],
          },
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: models.order_status,
              attributes: ['label']
            },
            {
              model: models.User,
              attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address1', 'address2', 'state',]
            },
            {
              model: models.shipping_info,
              attributes: ['address',]
            },
          ]
        });

        res.status(200).json({ data: adminGetAllRecentOrder });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    })()
  },
  adminOneOrder(req, res) {
    (async () => {
      try {
        const { isAdministrator } = req.user;
        if (!isAdministrator) {
          return res.status(401).json({
            error: 'Only Admins can see this',
          });
        }
        const { orderId } = req.params
        const getCxCredentials = await models.order.findOne(
          {
            where: {
              [Op.and]: [{
                orderId,
                checkedOut: true
              }],
            },
            include: [
              {
                model: models.order_status,
                attributes: ['label']
              },
              {
                model: models.User,
                attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'address1', 'address2', 'state',]
              },
              {
                model: models.shopping_cart,
                include: [{
                  model: models.Cart,
                  include: {
                    model: models.Product
                  }
                }]
              }
            ]
          }
        );
        res.status(200).json({ data: getCxCredentials, shoppingCart: getCxCredentials.shopping_cart });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    })()
  },
  adminOrderShipped(req, res) {
    (async () => {
      try {
        const { isAdministrator } = req.user;
        if (!isAdministrator) {
          return res.status(401).json({
            error: 'Only Admins can see this',
          });
        }
        const { orderId } = req.params
        const getCxCredentials = await models.order.findOne(
          {
            where: {
              [Op.and]: [{
                orderId,
                checkedOut: true
              }],
            },
            include: [
              {
                model: models.User,
                attributes: ['firstName', 'email', 'phoneNumber', 'address1', 'address2', 'state',]
              },
            ]
          }
        );
        // console.log(getCxCredentials.dataValues)
        const userInfo = {}


        const { User: user } = await getCxCredentials.dataValues
        const User = await user.dataValues
        userInfo.name = User.firstName
        userInfo.phone = User.phoneNumber
        userInfo.email = User.email
        userInfo.order = User.orderId
        userInfo.address = User.address1 + User.address2 + User.state

        // if (shipping_info.address.length > 1) {
        //   userInfo.address = User.address1 + User.address2 + User.state
        // }
        // else {
        // }

        const updateOrderRequest = await models.order.update(
          {
            status: 5,
            updatedAt: new Date()
          },
          {
            where: {
              [Op.and]: [{
                orderId,
                checkedOut: true
              }],
            }
          }
        );

                await orderComfirmed(userInfo)

        res.status(200).json({ data: 'Order has been shipped' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    })()
  },
  adminConfirmDelivery(req, res) {
    (async () => {
      try {
        const { isAdministrator } = req.user;
        if (!isAdministrator) {
          return res.status(401).json({
            error: 'Only Admins can see this',
          });
        }
        const { orderId } = req.params
        const confirmDelivery = await models.order.update(
          {
            status: 6,
            updatedAt: new Date()
          },
          {
            where: {
              [Op.and]: [{
                orderId,
                checkedOut: true
              }],
            },
          }
        );
        res.status(200).json({ data: 'Delivery confirmed' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    })()
  }
}
