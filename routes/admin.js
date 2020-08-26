const express = require('express');
const {
  createAdmin,
  signIn,
  getUserInfo,
  signUp,
  signUpValidator,
  devcreateAdmin,
  forgotPassword,
  passwordReset,
  signOut,
  authenticate,
  verifyAccount
} = require('../controller/admin/auth');
const { auth } = require('../middleware/auth');
const {
  postProduct,
  uploadValidator,
  getCategories,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getOneProduct,
  getProductsByCategory
} = require('../controller/admin/products');
const { listAllCategories } = require('../controller/admin/get-categories');
const multer = require('../middleware/multer');
const { addItemsToCart, getItemsInUserCart, removeItemFromCart } = require('../controller/admin/cart');
const { createOrder, getInitializedOrder, checkOutPay, verifyCheckOut, getRecentOrders, cancelOrder, adminGetAllOrders, adminOneOrder, adminOrderShipped, adminConfirmDelivery } = require('../controller/admin/orders');

const adminRouter = express.Router();

// USER
adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', signIn);
adminRouter.post('/signup', signUp);
// adminRouter.get('/auth', authenticate)
adminRouter.get('/sign-out', signOut)
adminRouter.patch('/account/activation', verifyAccount)
adminRouter.post('/auth/forgot-password', forgotPassword)
adminRouter.patch('/auth/reset-password', passwordReset)
adminRouter.get('/user/me', auth, getUserInfo)

//PRODUCT
adminRouter.post('/product', auth, multer, postProduct);
adminRouter.patch('/product/:productId', auth, multer, updateProduct)
adminRouter.get('/products', getAllProducts)
adminRouter.get('/products/:productId', getOneProduct)
adminRouter.delete('/product/:productId', auth, deleteProduct)

// auth, uploadValidator,
adminRouter.get('/categories', listAllCategories)
adminRouter.get('/category/:categoryId', getProductsByCategory)

//CART
adminRouter.post('/product/cart', auth, addItemsToCart)
adminRouter.get('/product/cart', auth, getItemsInUserCart)
adminRouter.delete('/product/cart/:cartId', auth, removeItemFromCart)

// CHECKOUT INIT
adminRouter.post('/cart/order', auth, createOrder)
adminRouter.post('/order/pay', auth, checkOutPay)
adminRouter.get('/cart/get-new-order', auth, getInitializedOrder)
adminRouter.get('/order/verify', auth, verifyCheckOut)
adminRouter.delete('/order/cancel', auth, cancelOrder)
adminRouter.get('/orders/recent', auth, getRecentOrders)

// adminRouter.post('/cart/checkout', auth, checkOutInit)
adminRouter.get('/admin/orders', auth, adminGetAllOrders)
adminRouter.get('/admin/orders/:orderId', auth, adminOneOrder)
adminRouter.get('/admin/shipped/orders/:orderId', auth, adminOrderShipped)
adminRouter.patch('/admin/delivered/orders/:orderId', auth, adminConfirmDelivery)



module.exports = adminRouter;
