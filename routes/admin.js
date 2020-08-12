const express = require('express');
const {
  createAdmin,
  signIn,
  signUp,
  signUpValidator,
  devcreateAdmin,
  forgotPassword,
  passwordReset,
  signOut,
  authenticate
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
const { checkOutInit, createOrder, getInitializedOrder } = require('../controller/admin/orders');

const adminRouter = express.Router();

// USER
adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', signIn);
adminRouter.post('/signup', signUp);
adminRouter.get('/auth', authenticate)
adminRouter.get('/sign-out', signOut)
adminRouter.post('/auth/forgot-password', forgotPassword)
adminRouter.patch('/auth/reset-password', passwordReset)

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
adminRouter.get('/cart/get-new-order', auth, getInitializedOrder)
adminRouter.post('/cart/checkout', auth, checkOutInit)

module.exports = adminRouter;
