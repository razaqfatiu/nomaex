const express = require('express');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('value');
})

module.exports = userRouter;
