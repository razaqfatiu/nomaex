const express = require('express');
const {
  createAdmin, adminSignIn, signUpValidator, devcreateAdmin,
} = require('../controller/admin/auth');
const { auth } = require('../middleware/auth');
const {
  postProduct, uploadValidator,
  // postAnimal, postFarmTool, postFishery,
  // postFruit, postGrain, postPoultry, postService, postTuber,
  // postVegetable,

} = require('../controller/admin/postUploads');
const multer = require('../middleware/multer');

const adminRouter = express.Router();

adminRouter.post('/dev-create-admin', devcreateAdmin);
adminRouter.post('/create-admin', auth, signUpValidator, createAdmin);
adminRouter.post('/signin', adminSignIn);
adminRouter.post('/product', auth, uploadValidator, multer, postProduct);
// adminRouter.post('/animal', auth, uploadValidator, multer, postAnimal);
// adminRouter.post('/farm-tool', auth, uploadValidator, multer, postFarmTool);
// adminRouter.post('/fishery', auth, uploadValidator, multer, postFishery);
// adminRouter.post('/fruit', auth, uploadValidator, multer, postFruit);
// adminRouter.post('/grain', auth, uploadValidator, multer, postGrain);
// adminRouter.post('/poultry', auth, uploadValidator, multer, postPoultry);
// adminRouter.post('/service', auth, uploadValidator, multer, postService);
// adminRouter.post('/tuber', auth, uploadValidator, multer, postTuber);
// adminRouter.post('/vegetable', auth, uploadValidator, multer, postVegetable);

module.exports = adminRouter;
