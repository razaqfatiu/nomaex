const express = require('express');
const {
  createAdmin,
  signIn,
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

const adminRouter = express.Router();


adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', signIn);
adminRouter.get('/auth', authenticate)
adminRouter.get('/sign-out', signOut)

adminRouter.post('/product', auth, multer, postProduct);
// auth, uploadValidator,
adminRouter.get('/categories', listAllCategories)

adminRouter.get('/products', getAllProducts)
adminRouter.get('/products/:productId', getOneProduct)
adminRouter.get('/category/:categoryId', getProductsByCategory)
adminRouter.patch('/product/:productId', auth, multer, updateProduct)
adminRouter.delete('/product', deleteProduct)

adminRouter.post('/auth/forgot-password', forgotPassword)
adminRouter.patch('/auth/reset-password', passwordReset)

adminRouter.post('/product/cart', auth, addItemsToCart)
adminRouter.get('/product/cart', auth, getItemsInUserCart)
adminRouter.delete('/product/cart/:cartId', auth, removeItemFromCart)

module.exports = adminRouter;
