require('dotenv').config();
const express = require('express');
const transporter = require('../config/nodemailer')

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('value');
})
userRouter.get('/test', async (req, res) => {
    try {
      const userInfo = { name: 'fatiu', email: 'razaqfatiu@gmail.com', token: 'dca4bfb708cc287a548ab4561ec9aa80f553ffb7' }
      emailConfig = {
        from: process.env.NOMAEX_EMAIL,
        to: userInfo.email,
        subject: 'Password Reset',
        text: `Dear ${userInfo.name}, \n\n
          You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
          Please click on the following link, or paste this into your browser to complete the process:\n
          ${req.protocol}://${req.get('host').slice(0, -4)}${process.env.frontEndPort}/reset-password/${userInfo.token}\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n\n
          Best regards,
          Nomaex.
 `};
      await transporter.sendMail(emailConfig)
      return res.status(200).json({ message: 'sent' });
    } catch (error) {
      return error
    }

})

module.exports = userRouter;
