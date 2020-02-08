const express = require('express');
const {
  createAdmin, adminSignIn, signUpValidator, devcreateAdmin,
} = require('../controller/admin/auth');
const { auth } = require('../middleware/auth');
const {
  postProduct, uploadValidator,
} = require('../controller/admin/postUploads');
const { listAllCategories } = require('../controller/admin/get-categories');
const multer = require('../middleware/multer');

const adminRouter = express.Router();

adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', adminSignIn);
adminRouter.post('/product', auth, uploadValidator, multer, postProduct);

adminRouter.get('/categories', auth, listAllCategories)

module.exports = adminRouter;
