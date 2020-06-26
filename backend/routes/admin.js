const express = require('express');
const {
  createAdmin, adminSignIn, signUpValidator, devcreateAdmin, forgotPassword, passwordReset
} = require('../controller/admin/auth');
const { auth } = require('../middleware/auth');
const {
  postProduct, uploadValidator, getCategories, updateProduct, getAllProducts, deleteProduct
} = require('../controller/admin/products');
const { listAllCategories } = require('../controller/admin/get-categories');
const { getOneProduct } = require('../controller/admin/product')
const multer = require('../middleware/multer');

const adminRouter = express.Router();

adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', adminSignIn);
adminRouter.post('/product', multer, postProduct);
// auth, uploadValidator,
adminRouter.get('/categories', listAllCategories)

adminRouter.get('/products', getAllProducts)
adminRouter.post('/products/one', getOneProduct)
adminRouter.patch('/product', multer, updateProduct)
adminRouter.delete('/product', deleteProduct)

adminRouter.post('/auth/forgot-password', forgotPassword)
adminRouter.patch('/auth/reset-password', passwordReset)



module.exports = adminRouter;
